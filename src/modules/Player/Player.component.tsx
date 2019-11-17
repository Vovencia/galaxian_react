import * as React from "react";

import { ShipComponent } from "../Ship/Ship.component";
import { PlayerModel } from "./Player.model";


export function PlayerComponent(props: {model: PlayerModel}) {
	return React.useMemo(() => <ShipComponent {...props } />, [props]);
}