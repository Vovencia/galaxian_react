import * as React from "react";
import { UnitComponent } from "../Unit/Unit.component";
import { BulletModel } from "./Bullet.model";

import "./Bullet.css";

export function BulletComponent(props: {model: BulletModel}) {
	return React.useMemo(() => <UnitComponent {...props} />, [props]);
}