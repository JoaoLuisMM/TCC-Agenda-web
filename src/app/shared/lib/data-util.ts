import {StringUtils} from "./string-utils";

export class DataUtil {

  static getDateFromString(dataHora: string) {
    if (dataHora) {
      if (dataHora.indexOf(' ') > -1) {
        return dataHora.substring(0, 10);
      }
    }
    return dataHora;
  }

  static getTimeFromString(dataHora: string) {
    if (dataHora) {
      if (dataHora.indexOf('/') > -1) {
        return dataHora.substring(11, 16);
      }
    }
    return dataHora;
  }

  static getTimeStringFromDate(data: Date): string {
    if (data) {
      return StringUtils.padLeft(data.getHours()) + ':' + StringUtils.padLeft(data.getMinutes());
    }
    return '';
  }

  static convertDateToUTC(date: Date) {
    if (date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
    return null;
  }

  static createDateAsUTC(date: Date) {
    if (date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(),
        date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    return null;
  }

  static formatDateToIso(data: Date): string {
    if (data) {
      const dataStr = data.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
      return dataStr+'T'+StringUtils.padLeft(data.getHours()) + ':'
        + StringUtils.padLeft(data.getMinutes()) + ':'
        + StringUtils.padLeft(data.getSeconds());
    }
    return '';
  }

  static createDateWithTime(date: Date, horario: string): Date {
    //new Date('2023/10/15 10:20:30')
    // console.log('\n-----> data: ' + date.getFullYear() + '/' + date.getUTCMonth() + '/' + date.getDate() + ' ' + horario + ':00');
    return new Date(date.getFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getDate() + ' ' + horario + ':00');
  }
}
