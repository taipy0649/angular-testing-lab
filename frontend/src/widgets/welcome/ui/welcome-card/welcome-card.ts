import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  template: `
    <section
      class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/10"
    >
      <p class="mb-3 text-sm font-bold tracking-[0.08em] text-violet-700 uppercase">
        {{ eyebrow }}
      </p>
      <h1 class="mb-4 text-4xl leading-none font-semibold tracking-tight sm:text-6xl">
        {{ title }}
      </h1>
      <p class="m-0 leading-7 text-slate-600">{{ description }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCard {
  protected readonly eyebrow = 'Feature-Sliced Design';
  protected readonly title = 'Angular Testing Lab';
  protected readonly description = 'Angularの開発とテストを、役割の明確な構成で学べます。';
}
