import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './create-user-request.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequestDto: CreateUserRequestDto) {
    this.users.push(createUserRequestDto);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequestDto.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequestDto.email),
    );
  }

  getAnalytics() {
    const pattern = { cmd: 'get_analytics' }
    const payload = {};
    return this.analyticsClient.send(pattern, payload);
  }
}
