import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WelcomeCard } from '@widgets/welcome';

@Component({
  selector: 'app-home-page',
  imports: [WelcomeCard],
  template: `
    <main class="grid min-h-dvh place-items-center bg-slate-50 p-8 text-slate-950">
      <app-welcome-card />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
