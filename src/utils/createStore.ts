import { useState, useEffect } from "react";
import { BaseModel } from "./BaseModel";

export function createStore<TStore extends BaseModel<any>>(
	globalStore: TStore
) {
	let listeners: {
		_version: string;
		setState: any;
		store: BaseModel<any>;
	}[] = [];

	const useStore = function<TResult extends BaseModel<any>>(
		mapState: (globalStore: TStore) => TResult
	) {
		const store = mapState(globalStore);
		const [, setState] = useState({
			store,
			_version: store._version
		});

		const listener = {
			_version: store._version,
			setState,
			store
		};

		useEffect(() => {
			listeners.push(listener);
			const unsubscribe = store.onChange(() => {
				listeners.forEach(_listener => {
					if (_listener.store !== store) return;
					if (_listener._version === store._version) return;
					_listener._version = store._version;
					_listener.setState({
						store,
						_version: store._version
					});
				});
			});
			return () => {
				listeners = listeners.filter(_listener => _listener !== listener);
				unsubscribe();
			};
		});

		return store;
	};

	return {
		useStore
	};
}
