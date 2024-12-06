/**
 * @description 配置文件
 * 1、配置的值若需要区分环境，则在对应的环境变量文件中配置，例如：.env.development
 * 2、在此处通过 process.env.xxx 获取对应环境变量，例如：process.env.NODE_ENV
 */
import * as dotenv from 'dotenv';
import { resolve } from 'path';
const env = process.env.NODE_ENV || 'development';
const envPath = resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

export default () => {
  return {
    port: process.env.PORT,
    globalPrefix: process.env.GLOBAL_PREFIX,
  };
};
