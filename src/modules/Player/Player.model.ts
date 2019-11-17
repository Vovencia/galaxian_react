import { ShipModel } from "../Ship/Ship.model";
import { PlayerComponent } from "./Player.component";

export class PlayerModel extends ShipModel {
	creator() {
		return PlayerComponent;
	}

	damage() {
		this.gameModel.stop();
		super.damage();
	}
}