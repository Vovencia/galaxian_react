import * as React from "react";
import { useState } from "react";
import { GameContainer } from "../Game/Game.container";
import { MenuComponent } from "../Menu/Menu.component";
import { GameModel } from "../Game/Game.model";
import { round } from "../../utils/round";

export function AppContainer() {
	const [state, setState] = useState({
		score: 0,
		maxScore: 0,
		playing: false,
	});

	function onGameEnd(gameModel: GameModel) {
		setState({
			...state,
			score: round(gameModel.state.score),
			maxScore: round(Math.max(state.maxScore, gameModel.state.score)),
			playing: false,
		});
	}

	function onGameStart() {
		setState({
			...state,
			playing: true,
		});
	}


	return state.playing
		? <GameContainer onGameEnd={ onGameEnd } />
		: <MenuComponent score={state.score} maxScore={state.maxScore} onGameStart={onGameStart} />
}