import * as React from "react";
import "./GameArea.css";

import { GameModel } from "../Game/Game.model";

export const GameAreaContainer = React.forwardRef((props: {children: any, gameModel: GameModel}, ref) => {
	return React.useMemo(() => {
		return (
			<div
				className="game-area"
				style={{
					width: props.gameModel.state.size.width + 'px',
					height: props.gameModel.state.size.height + 'px',
				}}
				ref={ ref as any }
			>
				{ props.children }
			</div>
		)
	}, [props.gameModel.state.size.width, props.gameModel.state.size.height, props.children, ref])

});