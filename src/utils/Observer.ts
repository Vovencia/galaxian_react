export type IEvents = "init" | "change" | "destroy" | "custom"

export class Observer {
	private _listeners!: Array<{
		handler: IListener;
		eventName: IEvents;
	}>;

	public get listeners() {
		if (!this._listeners) this._listeners = [];
		return this._listeners;
	}

	constructor(onInit?: IListener, onChange?: IListener, onDestroy?: IListener) {
		if (onInit) this.on("init", onInit);
		if (onChange) this.on("change", onChange);
		if (onDestroy) this.on("destroy", onDestroy);
	}

	public emit = (eventName: IEvents, ...args: any[]) => {
		for (const listener of this.listeners) {
			if (eventName !== listener.eventName) {
				continue;
			}
			listener.handler(...args);
		}
	};

	public on = (eventName: IEvents, handler: IListener) => {
		const index = this.listeners.length;
		this.listeners.push({
			eventName,
			handler,
		});
		return () => {
			this.listeners.splice(index, 1);
		};
	};

	public clearListeners = () => {
		this._listeners = [];
	};

	public destroy = () => {
		this.emit("destroy");
		this.clearListeners();
		delete this._listeners;
	};
}

export type IListener = (...args: any[]) => void;