import React from 'react';
type Props = {
    value: number;
    digitColor: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onLongPressDelete: () => void;
    canDelete: boolean;
};
export declare function DigitWheel({ value, digitColor, onIncrement, onDecrement, onLongPressDelete, canDelete, }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=DigitWheel.d.ts.map