import * as React from "react";
import "./Game.css"

import { ScoreComponent } from "../Score/Score.component";
import { SpeedComponent } from "../Speed/Speed.component";
import { GameAreaContainer } from "../GameArea/GameArea.container";
import { UnitModel } from "../Unit/Unit.model";
import { GameModel } from "./Game.model";
import { gameConfig } from "../../gameConfig";


export class GameContainer extends React.Component<{ onGameEnd: ((gameModel: GameModel) => void); }> {
	public gameModel = new GameModel(gameConfig);
	public state = {_version: this.gameModel._version};
	protected gameAreaRef = React.createRef<HTMLElement>();
	protected shootInterval: any;

	public componentDidMount() {
		this.gameModel.onChange(() => {
			this.setState({_version: this.gameModel._version});
		});
		this.gameModel.onStop = () => this.props.onGameEnd(this.gameModel);
		this.gameModel.emitInit();
	}
	public componentWillUnmount() {
		this.gameModel.destroy();
	}

	public render() {
		const units = this.gameModel.state.units.map( (unit: UnitModel) => {
			const UnitComponent = unit.creator();
			return <UnitComponent key={ unit.state.id } model={unit} />
		});
		return (
			<div
				className="game"
				onMouseMove={ this.onMouseMove }
				onMouseDown={ this.onMouseDown }
				onMouseUp={ this.onMouseUp }
			>
				<GameAreaContainer ref={ this.gameAreaRef } gameModel={this.gameModel} >
					<ScoreComponent value={ this.gameModel.state.score }/>
					<SpeedComponent value={ this.gameModel.state.speed }/>
					{ units }
				</GameAreaContainer>
			</div>
		)
	}

	public onMouseMove = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!this.gameModel.gameEngine.playing) return;
		const areaPosition = getAreaPosition(this.gameAreaRef.current);
		let xPosition = e.pageX - areaPosition.x;
		this.gameModel.movePlayer(xPosition);
	};

	public onMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		if (this.shootInterval) clearInterval(this.shootInterval);
		if (!this.gameModel.gameEngine.playing) return;
		this.shoot();
		this.shootInterval = setInterval(this.shoot, 300);
	};
	public onMouseUp = (e: React.MouseEvent) => {
		e.preventDefault();
		if (this.shootInterval) clearInterval(this.shootInterval);
		if (!this.gameModel.gameEngine.playing) return;
	};

	shoot = () => {
		this.gameModel.getPlayerModel().shoot();
	}
}


function getAreaPosition(element: HTMLElement | null) {
	if (!element) {
		return {
			x: 0,
			y: 0,
		}
	}
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
	}
}
