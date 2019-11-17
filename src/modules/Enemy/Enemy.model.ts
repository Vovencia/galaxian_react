import { ShipModel } from "../Ship/Ship.model";
import { EnemyComponent } from "./Enemy.component";

export class EnemyModel extends ShipModel {
	public shootTimeout: any;

	public creator(): any {
		return EnemyComponent;
	}

	public modelInit() {
		this.autoShoot();
	}

	public autoShoot() {
		clearTimeout(this.shootTimeout);
		const shootTimeout = (Math.random() * 1000 + 300)/this.gameModel.state.speed;
		this.shootTimeout = setTimeout(() => {
			this.shoot();
			this.autoShoot();
		}, shootTimeout);
	}

	public disableAutoShoot() {
		clearTimeout(this.shootTimeout);
	}

	public move(x?: number, y?: number) {
		super.move(x, y);
		if (this.state.position.x <= this.state.minPosition.x) {
			this.updateState({
				speed: {
					...this.state.speed,
					x: -this.state.speed.x,
				}
			})
		}
		if (this.state.position.x >= this.state.maxPosition.x) {
			this.updateState({
				speed: {
					...this.state.speed,
					x: -this.state.speed.x,
				}
			})
		}
	}

	public modelDestroy() {
		this.disableAutoShoot();
	}

	public damage() {
		super.damage();
		this.gameModel.addScore( 10 * this.gameModel.state.speed );
		this.gameModel.addRandomEnemy();
	}
}