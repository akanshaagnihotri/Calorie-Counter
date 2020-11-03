import * as React from 'react';
import { Path, G } from 'react-native-svg';
import { SvgIcon } from '../components';
import { Size } from '@types/Size';

interface Props {
  size?: Size;
}
const IconGoogle = ({ size = 'md' }: Props) => (
  <SvgIcon size={size}>
    <G clipRule="evenodd">
      <Path fill="none" d="M1.371 4.204h128v128h-128z" transform="scale(.12153 .11892)" />
      <Path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M28.956 68.204c0-4.157.69-8.143 1.923-11.88L9.31 39.851c-4.204 8.535-6.572 18.153-6.572 28.352 0 10.191 2.366 19.802 6.563 28.332l21.558-16.503a37.86 37.86 0 01-1.902-11.829"
        transform="scale(.12153 .11892)"
      />
      <Path
        fill="#EA4335"
        fillRule="evenodd"
        d="M66.828 30.386c9.031 0 17.188 3.2 23.597 8.436l18.644-18.618c-11.36-9.89-25.927-16-42.24-16-25.329 0-47.097 14.484-57.52 35.648l21.57 16.471a37.77 37.77 0 0135.95-25.937"
        transform="scale(.12153 .11892)"
      />
      <Path
        fill="#34A853"
        fillRule="evenodd"
        d="M66.828 106.022A37.77 37.77 0 0130.88 80.085L9.31 96.553c10.423 21.167 32.191 35.651 57.52 35.651 15.631 0 30.556-5.55 41.757-15.95l-20.474-15.829c-5.777 3.64-13.052 5.597-21.284 5.597"
        transform="scale(.12153 .11892)"
      />
      <Path
        fill="#4285F4"
        fillRule="evenodd"
        d="M128.005 68.204c0-3.782-.583-7.855-1.457-11.636h-59.72v24.727h34.376c-1.719 8.431-6.397 14.912-13.092 19.13l20.474 15.828c11.766-10.92 19.42-27.188 19.42-48.049"
        transform="scale(.12153 .11892)"
      />
    </G>
  </SvgIcon>
);

export default IconGoogle;
