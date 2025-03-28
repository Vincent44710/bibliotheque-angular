export namespace BookDialog {
  export class Display {
    static readonly type = '[CreateBooks] Display Dialog';

    constructor(public id: number) {}
  }

  export class Close {
    static readonly type = '[CreateBooks] Close Dialog';
  }
}
