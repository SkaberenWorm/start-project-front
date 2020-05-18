export interface ResultadoProc<T> {
  error: boolean;
  mensaje: string;
  salida: T;
}
