import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  static transform: any;

  // transform方法 接收參數 value
  transform(value: Date | string): string {
    // 將傳入的 value 轉換為 Date 類型
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      // 如果不是有效日期，返回空字串
      return '';
    }

    // 格式化為 zh-TW 的日期，並將 / 替換成 -
    return date.toLocaleString('zh-TW', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-');
  }
}
