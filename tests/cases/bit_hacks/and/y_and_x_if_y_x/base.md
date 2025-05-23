# Preval test case

# base.md

> Bit hacks > And > Y and x if y x > Base
>
> Base case of this pattern

## Input

`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('fail', spy === 16);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  let tmpCalleeParam = spy === 16;
  $(`fail`, tmpCalleeParam);
} else {
  let tmpCalleeParam$1 = spy === 16;
  $(`pass`, tmpCalleeParam$1);
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
