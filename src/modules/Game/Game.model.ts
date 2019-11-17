import { BaseModel } from "../../utils/BaseModel";
import { IListener } from "../../utils/Observer";
import { ISize } from "../../interfaces/ISize";
import { UnitModel } from "../Unit/Unit.model";
import { BulletModel, IBulletModelState } from "../Bullet/Bullet.model";
import { GameEngine } from "./Game.engine";
import { PlayerModel } from "../Player/Player.model";
import { ShipModel } from "../Ship/Ship.model";
import { EnemyModel } from "../Enemy/Enemy.model";

export class GameModel extends BaseModel<IGameState> {
	protected lastUnitId = 0;
	public gameEngine: GameEngine = new GameEngine(this);

	constructor(public state: IGameState, onChange?: IListener, onDestroy?: IListener) {
		super(undefined, onChange, () => {
			if (onDestroy) onDestroy();
			this.gameEngine.destroy();
		});
		this.on("init", () => {
			this.addUnit(
				new PlayerModel({
					id: this.createNextUnitId(),
					size: {width: 16*2, height: 24*2},
					position: {
						x: this.state.size.width/2,
						y: this.state.size.height - 50,
					},
					maxPosition: {
						x: this.state.size.width,
						y: this.state.size.height - 50,
					},
					minPosition: {
						x: 0,
						y: this.state.size.height - 50,
					},
					sprite: "./assets/spaceship-shooter-environment/spritesheets/ship.png",
					spritePosition: {x: 0, y: 0},
					spriteSize: {width: 80*2, height: 48*2},
					speed: {
						x: 0,
						y: 0,
					}
				})
			);
			this.addRandomEnemy();
			this.start();
		})
	}

	public start() {
		this.gameEngine.start();
	}

	public stop() {
		this.gameEngine.stop();
		this.gameEngine.destroy();
		this.onStop();
	}

	public onStop() {}

	public addUnit(unit: UnitModel) {
		unit.gameModel = this;
		this.updateState({
			units: this.state.units.concat([unit]),
		});
		unit.on("change", () => this.emit("change"));
	}

	public addRandomEnemy() {
		const xPosition = Math.round(Math.random() * this.state.size.width - 100) + 50;

		this.addUnit(
			new EnemyModel({
				id: this.createNextUnitId(),
				size: {width: 16*2, height: 16*2},
				position: {
					x: xPosition,
					y: 100,
				},
				maxPosition: {
					x: this.state.size.width - 50,
					y: 100,
				},
				minPosition: {
					x: 50,
					y: 100,
				},
				sprite: "./assets/spaceship-shooter-environment/spritesheets/enemy-small.png",
				spritePosition: {x: 0, y: 0},
				spriteSize: {width: 32*2, height: 16*2},
				speed: {
					x: -10,
					y: 0,
				}
			})
		);
	}

	public removeUnit(unit: UnitModel) {
		unit.destroy();
		this.updateState({
			units: this.state.units.filter(_unit => unit !== _unit),
		});
	}

	public createNextUnitId() {
		return ++this.lastUnitId;
	}

	public movePlayer(x?: number, y?: number) {
		const shipModel = this.getPlayerModel();
		shipModel.move(x, y);
	}

	public getPlayerModel() {
		return this.state.units.filter(unit => unit instanceof PlayerModel)[0] as PlayerModel;
	}

	public getBullets(type?: IBulletModelState['type']) {
		let result = this.state.units.filter(unit => unit instanceof BulletModel) as BulletModel[];
		if (type) {
			result = result.filter(bullet => bullet.state.type === type);
		}

		return result;
	}
	public getShips() {
		return this.state.units.filter(unit => (unit) instanceof ShipModel) as ShipModel[];
	}
	public getEnemies() {
		return this.state.units.filter(unit => (unit) instanceof EnemyModel) as EnemyModel[];
	}

	public addScore(value: number) {
		this.updateState({
			score: this.state.score + value,
		})
	}
}

export interface IGameState {
	speed: number;
	score: number;
	size: ISize;

	units: UnitModel[];
	enemyBulletState: IBulletModelState;
	playerBulletState: IBulletModelState;
	enemyGroupLayouts: Array<{
		layout: Array<1 | 0>;
		width: number;
	}>
}