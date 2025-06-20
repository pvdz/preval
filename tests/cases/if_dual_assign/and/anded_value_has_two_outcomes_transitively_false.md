# Preval test case

# anded_value_has_two_outcomes_transitively_false.md

> If dual assign > And > Anded value has two outcomes transitively false
>
> When a value is ANDed and bitwise checked, the certain comparisons may be resolved even if you don't know the actual value.

## Input

`````js filename=intro
const spy = $spy(16);
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
const spy /*:unknown*/ = $spy(16);
const x /*:number*/ /*&32*/ /*oneBitAnded*/ = spy & 32;
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
const spy = $spy(16);
if (spy & 32) {
  $(`fail`, false);
} else {
  $(`pass`, spy === 16);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 16 );
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
const spy = $spy(16);
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
 - 1: 'Creating spy', 1, 1, [16, 16]
 - 2: '$spy[1].valueOf()', 16
 - 3: 'pass', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
