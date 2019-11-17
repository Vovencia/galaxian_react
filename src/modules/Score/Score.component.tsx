import * as React from "react";

import "./Score.css";
import { round } from "../../utils/round";

export function ScoreComponent(props: IScoreProps) {
	return React.useMemo(function(){
		const value = round(props.value, 0);
		return <div className="score">Score: { value }</div>
	}, [props.value]);
}

export interface IScoreProps {
	value: number;
}