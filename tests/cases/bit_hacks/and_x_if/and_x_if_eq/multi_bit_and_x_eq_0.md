# Preval test case

# multi_bit_and_x_eq_0.md

> Bit hacks > And x if > And x if eq > Multi bit and x eq 0
>
> In some cases we can predict bitwise results or meta results

Note: since `&` will always return a 32bit int (never `undefined` or `Infinity`), we can safely do a truthy check.

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y === 0) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(200);
const y /*:number*/ = x & 200;
if (y) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(200) & 200) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
const b = a & 200;
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 200
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
