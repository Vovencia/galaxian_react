import { IBulletModelState } from "./modules/Bullet/Bullet.model";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

export const gameConfig = {
	score: 0,
	speed: 1,
	size: {
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
	},
	units: [],
	playerBulletState: {
		size: {width: 16*2, height: 16*2},
		position: {x: 0, y: 0},
		sprite: "./assets/spaceship-shooter-environment/spritesheets/laser-bolts.png",
		spriteSize: {width: 32*2, height: 32*2},
		spritePosition: {x: 0, y: 0},
		id: 0,
		delay: 1000,
		type: 'player' as IBulletModelState['type'],
		speed: {
			x: 0,
			y: -25,
		},
		collisionShapes: [{
			x1: -2*2,
			x2: 3*2,
			y1: -1*2,
			y2: 5*2,
		}]
	},
	enemyBulletState: {
		size: {width: 16*2, height: 16*2},
		position: {x: 0, y: 0},
		sprite: "./assets/spaceship-shooter-environment/spritesheets/laser-bolts.png",
		spriteSize: {width: 32*2, height: 32*2},
		spritePosition: {x: -16*2, y: 0},
		id: 0,
		delay: 200,
		type: 'enemy' as IBulletModelState['type'],
		speed: {
			x: 0,
			y: 25,
		},
		collisionShapes: [{
			x1: -4*2,
			x2: 1*2,
			y1: -1*2,
			y2: 5*2,
		}]
	},
	enemyGroupLayouts: [
		{
			layout: [
				0,0,1,0,1,0,0,
				1,1,1,1,1,1,1,
				1,0,0,0,0,0,1
			] as Array<0 | 1>,
			width: 7,
		}
	]
};