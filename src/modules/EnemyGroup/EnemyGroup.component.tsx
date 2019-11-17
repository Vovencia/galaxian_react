import * as React from "react";

import { ShipComponent } from "../Ship/Ship.component";
import { EnemyGroupModel } from "./EnemyGroup.model";


export function EnemyGroupComponent(props: {model: EnemyGroupModel}) {
	return React.useMemo(() => <ShipComponent {...props } />, [props.model.state]);
}