import { IUnitModelState, UnitModel } from "../Unit/Unit.model";
import { BulletModel } from "../Bullet/Bullet.model";
import { IListener } from "../../utils/Observer";
import { ShipComponent } from "./Ship.component";

export class ShipModel<TState extends IShipModelState = IShipModelState> extends UnitModel<TState> {
	constructor(state: TState, changeListener?: IListener, destroyListener?: IListener) {
		super({
			...state,
			className: 'ship',
		}, changeListener, destroyListener);
	}
	public move(x: number = this.state.position.x, y: number = this.state.position.y) {
		if (x < this.state.minPosition.x) {
			x = this.state.minPosition.x;
		}
		if (x > this.state.maxPosition.x) {
			x = this.state.maxPosition.x;
		}

		if (y < this.state.minPosition.y) {
			y = this.state.minPosition.y;
		}
		if (y > this.state.maxPosition.y) {
			y = this.state.maxPosition.y;
		}

		this.updateState({
			position: {
				x,
				y
			}
		})
	}

	public shoot() {
		BulletModel.create(this);
	}

	public creator() {
		return ShipComponent;
	}
}

export interface IShipModelState extends IUnitModelState {
	maxPosition: {
		x: number;
		y: number;
	}
	minPosition: {
		x: number;
		y: number;
	}
}