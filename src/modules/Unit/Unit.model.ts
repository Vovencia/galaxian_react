import { BaseModel } from "../../utils/BaseModel";
import { IListener } from "../../utils/Observer";
import { GameModel } from "../Game/Game.model";
import { IPoint } from "../../interfaces/IPoint";
import { ISize } from "../../interfaces/ISize";
import { UnitComponent } from "./Unit.component";

export class UnitModel<IState extends IUnitModelState = IUnitModelState> extends BaseModel<IUnitModelState> {
	public gameModel!: GameModel;
	public destroyed = false;
	public showCollisionShape = false;

	constructor(public state: IState, changeListener?: IListener, destroyListener?: IListener) {
		super(changeListener, () => {
			if (destroyListener) destroyListener();
			this.destroyed = true;
		});
	}

	public modelInit(){ }
	public modelDestroy(){ }

	public move(x: number = this.state.position.x, y: number = this.state.position.y) {
		this.updateState({
			position: {
				x,
				y
			}
		})
	}

	public creator(): any {
		return UnitComponent;
	}

	public damage() {
		this.gameModel.removeUnit(this);
	}

	public getCollisionShapes(): IUnitCollisionShape[] {
		if (this.state.collisionShapes) {
			return this.state.collisionShapes.map(shape => {
				return {
					x1: this.state.position.x + shape.x1,
					x2: this.state.position.x + shape.x2,
					y1: this.state.position.y + shape.y1,
					y2: this.state.position.y + shape.y2,
				}
			});
		}

		const widthHalf = this.state.size.width/2;
		const heightHalf = this.state.size.height/2;

		return [
			{
				x1: this.state.position.x - widthHalf,
				x2: this.state.position.x + widthHalf,
				y1: this.state.position.y - heightHalf,
				y2: this.state.position.y + heightHalf,
			}
		]
	}
}

export interface IUnitCollisionShape {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface IUnitModelState {
	position: IPoint;
	size: ISize;
	className?: string;
	sprite: string;
	spritePosition: IPoint;
	spriteSize: ISize;
	id: number;
	collisionShapes?: IUnitCollisionShape[];
	speed: {
		x: number;
		y: number;
	};
}