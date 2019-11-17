import { IUnitModelState, UnitModel } from "../Unit/Unit.model";
import { IListener } from "../../utils/Observer";
import { BulletComponent } from "./Bullet.component";
import { PlayerModel } from "../Player/Player.model";

export class BulletModel extends UnitModel<IBulletModelState> {
	public static create(ship: UnitModel) {
		const isPlayer = (ship instanceof PlayerModel);
		const bullet = new BulletModel({
			...(isPlayer ? ship.gameModel.state.playerBulletState : ship.gameModel.state.enemyBulletState),
			id: ship.gameModel.createNextUnitId(),
			position: ship.state.position
		}, ship.gameModel.emitChange);
		ship.gameModel.addUnit(bullet);
	}

	constructor(state: IBulletModelState, changeListener?: IListener, destroyListener?: IListener) {
		super({
			...state,
			className: 'bullet',
		}, changeListener, destroyListener);
	}

	public creator() {
		return BulletComponent;
	}
}

export interface IBulletModelState extends IUnitModelState {
	type: "player" | "enemy";
	delay: number;
}