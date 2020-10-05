import { loadState, PreloadedState, saveState } from "store/localStorage";

class LocalStorageMock {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.store[key];
  }
}

describe("Local storage", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localStorage = new LocalStorageMock() as any;
  });
  test("loadState", () => {
    localStorage.setItem("state", "1");

    const input = loadState();
    const output = 1;

    expect(input).toBe(output);

    localStorage.clear();
  });

  test("loadState if getItem return null ", () => {
    const input = loadState();
    const output: PreloadedState = {};

    expect(input).toEqual(output);

    localStorage.clear();
  });

  test("saveState", () => {
    saveState({
      tasks: [
        { id: "1", title: "Test1", description: "test1", closed: false },
        { id: "2", title: "Test2", description: "test2", closed: false },
      ],
    });

    const input = localStorage.getItem("state");
    const output = JSON.stringify({
      tasks: [
        { id: "1", title: "Test1", description: "test1", closed: false },
        { id: "2", title: "Test2", description: "test2", closed: false },
      ],
    });

    expect(input).toBe(output);

    localStorage.clear();
  });
});