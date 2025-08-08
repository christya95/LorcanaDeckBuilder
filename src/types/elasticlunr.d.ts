declare module 'elasticlunr' {
  export interface Index<T> {
    setRef(ref: string): void;
    addField(field: string, options?: { boost?: number }): void;
    addDoc(doc: T): void;
    search(query: string, options?: any): Array<{ ref: any; score: number }>;
    documentStore: {
      getDoc(ref: any): T;
    };
  }

  export default function elasticlunr<T>(): Index<T>;
}
