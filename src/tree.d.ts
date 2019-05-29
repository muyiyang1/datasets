import * as React from 'react';

export interface ExploreTreeProps {
  className?: string;
  data: Array<any>,
  expendId?: Array<any>,
}

declare class ExploreTree extends React.PureComponent<ExploreTreeProps, any> {
    constructor(props: ExploreTreeProps);
    render(): JSX.Element;
}

export default ExploreTree;