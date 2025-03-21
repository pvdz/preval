# Preval test case

# anded_value_has_two_outcomes_transitively.md

> If dual assign > And > Anded value has two outcomes transitively
>
> When a value is ANDed and bitwise checked, the certain comparisons may be resolved even if you don't know the actual value.

## Input

`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  // If x is true then spy must be 32 so spy cannot be 16 here
  $('fail', spy === 16);
} else {
  // If x is false then spy must not be 32 but could still be anything else, including 16
  $('pass', spy === 16);
}
`````


## Settled


`````js filename=intro
const spy /*:unknown*/ = $spy();
const x /*:number*/ = spy & 32;
if (x) {
  $(`fail`, false);
} else {
  const tmpCalleeParam$1 /*:boolean*/ = spy === 16;
  $(`pass`, tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = $spy();
if (spy & 32) {
  $(`fail`, false);
} else {
  $(`pass`, spy === 16);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a & 32;
if (b) {
  $( "fail", false );
}
else {
  const c = a === 16;
  $( "pass", c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 'fail', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
