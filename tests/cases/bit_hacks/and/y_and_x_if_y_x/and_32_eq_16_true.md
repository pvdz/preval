# Preval test case

# and_32_eq_16_true.md

> Bit hacks > And > Y and x if y x > And 32 eq 16 true
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

## Input

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('pass', spy === 16);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('fail', spy === 16);
}
`````


## Settled


`````js filename=intro
const spy /*:unknown*/ = $spy(33);
const x /*:number*/ = spy & 32;
if (x) {
  $(`pass`, false);
} else {
  const tmpCalleeParam$1 /*:boolean*/ = spy === 16;
  $(`fail`, tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = $spy(33);
if (spy & 32) {
  $(`pass`, false);
} else {
  $(`fail`, spy === 16);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 33 );
const b = a & 32;
if (b) {
  $( "pass", false );
}
else {
  const c = a === 16;
  $( "fail", c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [33, 33]
 - 2: '$spy[1].valueOf()', 33
 - 3: 'pass', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
