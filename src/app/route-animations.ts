import {
    trigger,
    transition,
    style,
    group,
    query,
    animate,
} from '@angular/animations';

const optional = { optional : true};

export const fadeAnimation =
trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        opacity: 0.2,
        top: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden'
      })
    ], optional),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('300ms ease', style({ right: '100%',
        opacity: 0.2}))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({ right: '0%', 
        opacity: 0.2}))
      ])
    ]),
  ])
]);