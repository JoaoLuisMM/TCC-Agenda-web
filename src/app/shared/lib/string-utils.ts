export class StringUtils {

  static padLeft(valor: number): string {
    if (valor) {
      return valor.toString().padStart(2, "0");
    }
    return '00';
  }
}
