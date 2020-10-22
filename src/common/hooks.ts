import { useState } from 'react';

export type Key<T> = keyof T;
export type Val<T> = T[keyof T];

export interface Dispatch<T> {
    (val: Partial<T>): void;

    // tslint:disable-next-line:unified-signatures
    (fun: (state: T) => Partial<T>): void;

    (key: Key<T>): (val: Val<T>) => void;
}

/**
 * 简化useState的参数问题
 * eg: const [state, setState] = useState({a, b, c, d})
 * setState({a}) // 只需要传递一个参数
 * setState({b}) // 不再需要传递所有的参数
 * setState('a')('a的value值') // 方便在事件中使用 <Select onChange={ setState('key') } />
 */
export function useSetState<T>(state: T): [T, Dispatch<T>] {
    const [_state, setState] = useState(state);
    const _setState: any = (args: any) => {
        if (typeof args === 'string') {
            return (val: Val<T>) => {
                setState((state) => {
                    return { ...state, [args]: val };
                });
            };
        } else if (typeof args === 'function') {
            setState((state) => {
                const nextState = args(state);
                return { ...state, ...nextState };
            });
        } else if (typeof args === 'object') {
            setState((state) => {
                return { ...state, ...args };
            });
        }
    };
    return [_state, _setState];
}
