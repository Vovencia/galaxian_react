import { IShipModelState, ShipModel } from "../Ship/Ship.model";
import { EnemyGroupComponent } from "./EnemyGroup.component";

export class EnemyGroupModel extends ShipModel<IEnemyGroupModel> {
	creator(): any {
		return EnemyGroupComponent;
	}
}

export interface IEnemyGroupModel extends IShipModelState {
	layout: Array<1 | 0>;
	layoutWidth: number;
}