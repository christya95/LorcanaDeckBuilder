declare module 'elasticlunr' {
  export interface Result {
    ref: string;
    score: number;
  }
  export interface DocumentStore {
    getDoc(id: string): any;
  }
  export interface Index<T> {
    addField(fieldName: string, options?: any): void;
    setRef(ref: string): void;
    addDoc(doc: T): void;
    search(query: string, options?: any): Result[];
    documentStore: DocumentStore;
  }
  export default function elasticlunr<T>(config?: (this: Index<T>) => void): Index<T>;
}
