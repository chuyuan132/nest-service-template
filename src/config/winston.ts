import * as chalk from 'chalk';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 定义日志级别颜色
const levelsColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  verbose: 'cyan',
};

const winstonLogger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'nestjs-service' },
  transports: [
    new DailyRotateFile({
      filename: 'src/logs/errors/error-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
      maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
      level: 'error', // 日志类型，此处表示只记录错误日志。
    }),
    new DailyRotateFile({
      filename: 'src/logs/warnings/warning-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'warn',
    }),
    new DailyRotateFile({
      filename: 'src/logs/other/other-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize({
          colors: levelsColors,
        }),
        format.printf((info) => {
          const symbols = Object.getOwnPropertySymbols(info);
          const color = levelsColors[info[symbols[0]] as any];
          const chalkColor = chalk[color];
          const message = `${chalkColor(info.timestamp)} ${chalkColor(info[symbols[2]])}`;
          return message;
        }),
      ),
      level: 'error',
    }),
  ],
});

export default winstonLogger;