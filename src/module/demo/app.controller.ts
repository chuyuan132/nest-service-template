import { Controller, Get, Query } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { DemoService } from './app.service';

@Controller('/demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}
  @Get()
  createUser(@Query() createUserDto: CreateUserDto) {
    return this.demoService.createUser(createUserDto);
  }
}
