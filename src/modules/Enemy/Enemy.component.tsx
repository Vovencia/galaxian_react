import * as React from "react";

import { ShipComponent } from "../Ship/Ship.component";
import { EnemyModel } from "./Enemy.model";


export function EnemyComponent(props: {model: EnemyModel}) {
	return React.useMemo(() => <ShipComponent {...props } />, [props]);
}