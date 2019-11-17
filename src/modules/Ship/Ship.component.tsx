import * as React from "react";

import { UnitComponent } from "../Unit/Unit.component";
import { ShipModel } from "./Ship.model";


export function ShipComponent(props: {model: ShipModel}) {
	return React.useMemo(() => <UnitComponent {...props } />, [props]);
}