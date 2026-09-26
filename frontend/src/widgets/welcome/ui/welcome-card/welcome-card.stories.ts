import type { Meta, StoryObj } from '@storybook/angular-vite';

import { WelcomeCard } from './welcome-card';

const meta = {
  title: 'Widgets/WelcomeCard',
  component: WelcomeCard,
} satisfies Meta<typeof WelcomeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
