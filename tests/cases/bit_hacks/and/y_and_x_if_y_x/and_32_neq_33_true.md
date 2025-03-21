# Preval test case

# and_32_neq_33_true.md

> Bit hacks > And > Y and x if y x > And 32 neq 33 true
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

## Input

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('fail', spy !== 33);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('pass', spy !== 33);
}
`````


## Settled


`````js filename=intro
const spy /*:unknown*/ = $spy(33);
const x /*:number*/ = spy & 32;
if (x) {
  const tmpCalleeParam /*:boolean*/ = spy !== 33;
  $(`fail`, tmpCalleeParam);
} else {
  $(`pass`, true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = $spy(33);
if (spy & 32) {
  $(`fail`, spy !== 33);
} else {
  $(`pass`, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 33 );
const b = a & 32;
if (b) {
  const c = a !== 33;
  $( "fail", c );
}
else {
  $( "pass", true );
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
 - 3: 'fail', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
