import React from 'react';
import { SunIcon } from '../icons';

interface Props {
  onClick: () => void;
  paintIcon?: boolean;
}

const HightlightBtn = ({ onClick, paintIcon }: Props) => {

  return React.createElement(
    'button', { onClick },
    React.createElement(
      SunIcon, { colorIcon: paintIcon ? 'lightgreen' : 'white' },
      null
    )
  )
}

export default React.memo(HightlightBtn);
