import React from 'react';
type Props = {
    separatorChar: string;
    isPlacementMode: boolean;
    onToggle: () => void;
    visible: boolean;
};
export declare function SeparatorControl({ separatorChar, isPlacementMode, onToggle, visible }: Props): React.JSX.Element | null;
type GapProps = {
    onPress: () => void;
    visible: boolean;
};
export declare function SeparatorGap({ onPress, visible }: GapProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=SeparatorControl.d.ts.map