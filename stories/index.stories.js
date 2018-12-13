import { storiesOf } from '@storybook/react';

import basic from './basic';
import customLink from './customLink';
import multiplePorts from './multiplePorts';
import customBehavior from './customBehavior';

storiesOf('BasicLink pipeline', module)
	.add('basic', basic)
	.add('custom link shape', customLink)
	.add('multiple ports', multiplePorts)
	.add('custom pipeline bahavior', customBehavior);
