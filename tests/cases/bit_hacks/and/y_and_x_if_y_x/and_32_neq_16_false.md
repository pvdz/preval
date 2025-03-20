# Preval test case

# and_32_neq_16_false.md

> Bit hacks > And > Y and x if y x > And 32 neq 16 false
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

## Input

`````js filename=intro
const spy = $spy(17);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('fail', spy !== 16);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('pass', spy !== 16);
}
`````


## Settled


`````js filename=intro
const spy /*:unknown*/ = $spy(17);
const x /*:number*/ = spy & 32;
const tmpCalleeParam /*:boolean*/ = spy !== 16;
if (x) {
  $(`fail`, tmpCalleeParam);
} else {
  $(`pass`, tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = $spy(17);
const x = spy & 32;
const tmpCalleeParam = spy !== 16;
if (x) {
  $(`fail`, tmpCalleeParam);
} else {
  $(`pass`, tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 17 );
const b = a & 32;
const c = a !== 16;
if (b) {
  $( "fail", c );
}
else {
  $( "pass", c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [17, 17]
 - 2: '$spy[1].valueOf()', 17
 - 3: 'pass', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
