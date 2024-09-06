export class Todo {
  private _title: string;
  private _state: string;
  private _id: string;
  /**
   * Creates a new Todo object
   * @param vTitle The title of the Todo
   * @param vState The state of the Todo. Possible values are "toDo", "doing", "done"
   */
  constructor(public vTitle: string, public vState: string) {
    this._title = vTitle;
    this._state = vState;
    this._id = "";
  }

  public get title(): string {
    return this._title;
  }
  public get state(): string {
    return this._state;
  }

  public get id(): string {
    return this._id;
  }

  public set state(vState: string) {
    this._state = vState;
  }

  public set title(vTitle: string) {
    this._title = vTitle;
  }

  public set id(vId: string) {
    this._id = vId;
  }
}
