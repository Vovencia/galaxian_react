import * as React from "react";

import "./Unit.css"
import { UnitModel } from "./Unit.model";

export function UnitComponent(props: {model: UnitModel}) {
	React.useEffect(() => {
		props.model.modelInit();
		props.model.emitInit();
		return () => {
			props.model.modelDestroy();
		}
	}, []);

	return React.useMemo(function(){
		const _props = {
			className: `unit ${ props.model.state.className || '' }`,
			style: {
				width: props.model.state.size.width + 'px',
				height: props.model.state.size.height + 'px',
				transform: `translate(${props.model.state.position.x + 'px'}, ${props.model.state.position.y + 'px'})`,
				marginLeft: (-props.model.state.size.width/2) + 'px',
				marginTop: (-props.model.state.size.height/2) + 'px',
				backgroundImage: `url(${ props.model.state.sprite })`,
				backgroundSize: `${ props.model.state.spriteSize.width }px ${ props.model.state.spriteSize.height }px`,
				backgroundPosition: `${ props.model.state.spritePosition.x }px ${ props.model.state.spritePosition.y }px`,
			}
		};

		let collisionShapeElements: any[] = [];
		if (props.model.showCollisionShape) {
			const collisionShape = props.model.getCollisionShapes();
				collisionShapeElements = collisionShape.map((shape, index) => <div key={index} style={{
				position: 'absolute',
				left: shape.x1 + 'px',
				top: shape.y1 + 'px',
				width: shape.x2 - shape.x1 + 'px',
				height: shape.y2 - shape.y1 + 'px',
				backgroundColor: 'rgba(255, 0, 0, 0.5)',
			}} />);
		}

		return <>
			<div {..._props} />
			{collisionShapeElements}
		</>
	}, [props.model.state]);
}