export class Observer {
	private _initListeners!: IListener[];
	private _changeListeners!: IListener[];
	private _destroyListeners!: IListener[];

	public get changeListeners() {
		if (!this._changeListeners) this._changeListeners = [];
		return this._changeListeners;
	}
	public get destroyListeners() {
		if (!this._destroyListeners) this._destroyListeners = [];
		return this._destroyListeners;
	}
	public get initListeners() {
		if (!this._initListeners) this._initListeners = [];
		return this._initListeners;
	}

	constructor(changeListener?: IListener, destroyListener?: IListener) {
		if (changeListener) {
			this.onChange(changeListener);
		}
		if (destroyListener) {
			this.onDestroy(destroyListener);
		}
	}
	public emitChange = () => {
		for (const listener of this.changeListeners) {
			listener();
		}
	};
	public emitDestroy = () => {
		for (const listener of this.destroyListeners) {
			listener();
		}
	};
	public emitInit = () => {
		for (const listener of this.initListeners) {
			listener();
		}
	};

	public onChange = (listener: IListener) => {
		const index = this.changeListeners.length;
		this.changeListeners.push(listener);
		return () => {
			this.changeListeners.splice(index, 1);
		};
	};

	public onDestroy = (listener: IListener) => {
		const index = this.destroyListeners.length;
		this.destroyListeners.push(listener);
		return () => {
			this.destroyListeners.splice(index, 1);
		};
	};
	public onInit = (listener: IListener) => {
		const index = this.initListeners.length;
		this.initListeners.push(listener);
		return () => {
			this.initListeners.splice(index, 1);
		};
	};

	public clearListeners = () => {
		this._initListeners = [];
		this._changeListeners = [];
		this._destroyListeners = [];
	};

	public destroy = () => {
		this.emitDestroy();
		this.clearListeners();
		delete this._changeListeners;
		delete this._destroyListeners;
		delete this._initListeners;
	};
}

export type IListener = () => void;