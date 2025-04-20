# Preval test case

# and_one_bool.md

> Bit hacks > And > And one bool
>
> This is basically a bool check but can be generic

## Input

`````js filename=intro
const x = $(1) & 1;
let y = x & 1
if (y === 1) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(1);
const x /*:number*/ = tmpBinLhs & 1;
if (x) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) & 1) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a & 1;
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
