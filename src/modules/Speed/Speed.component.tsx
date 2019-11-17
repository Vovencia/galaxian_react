import * as React from "react";
import { round } from "../../utils/round";

import "./Speed.css";

export function SpeedComponent(props: ISpeedProps) {
	return React.useMemo(function(){
		const value = round(props.value, 2);
		return <div className="speed">{ value }x Speed</div>
	}, [props.value]);
}

export interface ISpeedProps {
	value: number;
}