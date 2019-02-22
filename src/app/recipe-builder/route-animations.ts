/**
 * @file Logic for the page transition animations in the
 * recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */

import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '30%',
        opacity: 0,
        transition: 'scale(0) translateY(100%)'
      })
    ]),
    query(':enter', [
      animate('600ms ease'),
      style({ opacity: 1, transform: 'scale(1) translateY(0)' })
    ])
  ])
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right'))
]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          [direction]: 0,
          width: '100%'
        })
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-200%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '200%' }))],
        optional
      ),
      query(
        ':enter',
        [animate('600ms ease', style({ [direction]: '0%' }))],
        optional
      )
    ])
  ];
}
