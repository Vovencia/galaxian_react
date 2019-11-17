import { NonStrict } from "./NonStrict";
import { Observer, IListener } from "./Observer";

export abstract class BaseModel<IState extends {}> extends Observer {
	public abstract state: IState;
	public _version = `${Date.now()}${Math.random()}`;
	protected isEmitChangeEnabled = true;
	protected constructor(changeListener?: IListener, destroyListener?: IListener) {
		super(changeListener, destroyListener);
		this.onChange(() => {
			this._version = `${Date.now()}${Math.random()}`;
		});
	}

	public setState = (state: IState) => {
		if (this.state === state) return;
		this.state = state;
		if (this.isEmitChangeEnabled) this.emitChange();
	};

	public updateState = (state: NonStrict<IState>) => {
		if (this.state === state) return;
		this.setState({
			...this.state,
			...state
		});
	};

	public emitChangeEnable = (isEnabled: boolean) => {
		this.isEmitChangeEnabled = isEnabled;
	};
}
