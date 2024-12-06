import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  createUser(user: any) {
    console.log('参数：', user);

    return { data: {}, message: '创建成功', code: 200 };
  }
}
