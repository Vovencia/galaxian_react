import { GameModel } from "./Game.model";
import { BulletModel } from "../Bullet/Bullet.model";
import { PlayerModel } from "../Player/Player.model";
import { IUnitCollisionShape, UnitModel } from "../Unit/Unit.model";

const FPS = 60;

export class GameEngine {
	public playing = false;
	protected lastFrameTime = Date.now();
	protected speedInterval: any;


	constructor(private gameModel: GameModel) {}

	public start() {
		this.playing = true;
		this.gameModel.getPlayerModel().on("change", this.checkCollisions);
		this.speedInterval = setInterval(() => this.speedUp(), 1000);
		this.tick();
	}

	public stop() {
		this.playing = false;
		clearInterval(this.speedInterval);
	}

	public destroy() {
		this.stop();
	}

	private tick = () => {
		if (!this.playing) return;
		window.requestAnimationFrame(() => {
			this.updateScene();
			this.tick();
		});
	};


	public speedUp() {
		let newValue = this.gameModel.state.speed * 1.01;
		if (newValue > 5) newValue = 5;
		this.gameModel.updateState({
			speed: newValue
		})
	}

	public updateScene() {
		if (!this.playing) return;
		this.checkCollisions();
		this.moveUnits();
		this.cleanUnits();
		this.checkCollisions();
	}

	protected moveUnits = () => {
		if (!this.playing) return;

		const currentFrameTime = Date.now();
		const timeDiff = currentFrameTime - this.lastFrameTime;
		const speedRatio = (timeDiff/FPS) * this.gameModel.state.speed;
		this.lastFrameTime = currentFrameTime;

		for (const unit of this.gameModel.state.units) {
			if (unit instanceof PlayerModel) continue;
			unit.move(
				unit.state.position.x + (unit.state.speed.x*speedRatio),
				unit.state.position.y + (unit.state.speed.y*speedRatio),
			);
		}
	};

	protected cleanUnits() {
		for (const unit of this.gameModel.state.units) {
			if (unit.state.speed.y === 0) continue;
			if (unit instanceof BulletModel) {
				this.cleanBullet(unit);
			}
		}
	}

	protected cleanBullet(unit: BulletModel) {
		let remove = false;
		if (unit.state.speed.y > 0) {
			if (unit.state.position.y > this.gameModel.state.size.height + unit.state.size.height) {
				remove = true;
			}
		} else {
			if (unit.state.position.y < -unit.state.size.height) {
				remove = true;
			}
		}
		if (remove) this.gameModel.removeUnit(unit);
	}

	protected checkCollisions = () => {
		if (!this.playing) return;

		const playerBullets = this.gameModel.getBullets('player');
		const enemiesBullets = this.gameModel.getBullets('enemy');
		const enemies = this.gameModel.getEnemies();
		const player = this.gameModel.getPlayerModel();

		// for (const playerBullet of playerBullets) {
		// 	for (const enemyBullet of enemiesBullets) {
		// 		if (GameEngine.isCollisionUnit(playerBullet, enemyBullet)) {
		// 			playerBullet.damage();
		// 			enemyBullet.damage();
		// 		}
		// 	}
		// }

		for (const playerBullet of playerBullets) {
			for (const enemy of enemies) {
				if (GameEngine.isCollisionUnit(playerBullet, enemy)) {
					enemy.damage();
				}
			}
		}

		for (const enemyBullet of enemiesBullets) {
			if (GameEngine.isCollisionUnit(player, enemyBullet)) {
				player.damage();
			}
		}
	};

	public static isCollisionUnit(obj1: UnitModel, obj2: UnitModel) {
		for (const obj1Shape of obj1.getCollisionShapes()) {
			for (const obj2Shape of obj2.getCollisionShapes()) {
				if (this.isCollisionShapes(obj1Shape, obj2Shape)){
					return true;
				}
			}
		}
		return false;
	}

	public static isCollisionShapes(shape1: IUnitCollisionShape, shape2: IUnitCollisionShape) {
		const shape1Width = shape1.x2 - shape1.x1;
		const shape2Width = shape2.x2 - shape2.x1;
		const shape1Height = shape1.y2 - shape1.y1;
		const shape2Height = shape2.y2 - shape2.y1;
		return shape1.x1 < shape2.x1 + shape2Width &&
		   shape1.x1 + shape1Width > shape2.x1 &&
		   shape1.y1 < shape2.y1 + shape2Height &&
		   shape1.y1 + shape1Height > shape2.y1
	}

}