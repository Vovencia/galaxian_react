import * as React from "react"

import "./Menu.css";

export function MenuComponent (props: {
	onGameStart: () => void;
	score: number;
	maxScore: number;
}) {
	return <div className="menu">
		<div className="menu__score">Last score: { props.score }</div>
		<div className="menu__score">Max score: { props.maxScore }</div>
		<div className="menu__start-game">
			<button className="menu__start-game-button" onClick={props.onGameStart}>Start Game</button>
		</div>
	</div>;
}