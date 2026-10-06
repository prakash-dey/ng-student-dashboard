// Minimal runtime for the ported design logic. It mirrors React class-component semantics, which the
// design code relies on: setState is batched and applied after the current task, so `this.state` still
// holds the old values right after a setState call (e.g. miniWin/microWin compute keys from it).
export type Device = 'phone' | 'desktop';

type Patch = Record<string, any> | ((s: any) => Record<string, any>);

export abstract class DCLogic {
  state: any = {};
  /** Called after each state flush so the view can re-render. */
  onChange: (() => void) | null = null;
  private queue: Patch[] = [];
  private scheduled = false;

  setState(patch: Patch) {
    this.queue.push(patch);
    if (this.scheduled) return;
    this.scheduled = true;
    queueMicrotask(() => this.flush());
  }

  /** Apply queued patches now. */
  flush() {
    this.scheduled = false;
    if (!this.queue.length) return;
    const prev = this.state;
    let next = { ...prev };
    for (const p of this.queue.splice(0)) Object.assign(next, typeof p === 'function' ? p(next) : p);
    this.state = next;
    this.onChange?.();
    this.componentDidUpdate?.(null, prev);
  }

  componentDidMount?(): void;
  componentWillUnmount?(): void;
  componentDidUpdate?(prevProps: unknown, prevState: any): void;
}
