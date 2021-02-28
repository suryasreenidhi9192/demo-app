import React from 'react';

import './notificationIcons.scss'

const SvgNotificationErrorLight = props => (
  <svg viewBox="0 0 32 32" {...props}>
    <title>{'\n        Error Notification\n    '}</title>
    <g fill="none" fillRule="evenodd">
      <path
        className="Notification-Error-Light_svg__path-01"
        /* eslint-disable-next-line */
        d="M21.744 29.867l8.123-8.123V10.256l-8.123-8.123H10.256l-8.123 8.123v11.488l8.123 8.123h11.488zM8.956 31.583l-8.331-8.33c-.4-.4-.625-.944-.625-1.51V10.257c0-.565.225-1.108.625-1.508L8.748.625c.4-.4.943-.625 1.508-.625h11.488c.566 0 1.109.225 1.509.625l8.122 8.123c.4.4.625.943.625 1.508v11.488c0 .565-.225 1.108-.625 1.508l-8.122 8.123c-.4.4-.943.625-1.509.625H9.962c-.377 0-.74-.15-1.006-.417z"
      />
      <path
        className="Notification-Error-Light_svg__path-02"
        /* eslint-disable-next-line */
        d="M17.27 20.64a.825.825 0 01-.145.488.52.52 0 01-.171.16.356.356 0 01-.174.045h-1.56c-.133 0-.248-.068-.345-.205a.825.825 0 01-.145-.489l-.508-12.834c0-.188.049-.351.145-.488.097-.137.212-.206.345-.206h2.576c.133 0 .248.069.345.206.096.137.145.3.145.488L17.27 20.64zM16 25.6a1.422 1.422 0 110-2.844 1.422 1.422 0 010 2.844z"
      />
    </g>
  </svg>
);

export default SvgNotificationErrorLight;
