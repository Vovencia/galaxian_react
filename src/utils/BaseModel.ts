import { NonStrict } from "./NonStrict";
import { Observer, IListener } from "./Observer";

export abstract class BaseModel<IState extends {}> extends Observer {
	public abstract state: IState;
	public _version = `${Date.now()}${Math.random()}`;
	protected isEmitChangeEnabled = true;
	protected constructor(onInit?: IListener, onChange?: IListener, onDestroy?: IListener) {
		super(onInit, onChange, onDestroy);
		this.on("change", () => {
			this._version = `${Date.now()}${Math.random()}`;
		});
	}

	public setState = (state: IState) => {
		if (this.state === state) return;
		this.state = state;
		if (this.isEmitChangeEnabled) this.emit("change");
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
