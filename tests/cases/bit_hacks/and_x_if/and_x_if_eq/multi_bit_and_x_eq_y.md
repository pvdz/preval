# Preval test case

# multi_bit_and_x_eq_y.md

> Bit hacks > And x if > And x if eq > Multi bit and x eq y
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y === 64) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(200);
const y /*:number*/ /*&200*/ = x & 200;
const tmpIfTest /*:boolean*/ = y === 64;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (($(200) & 200) === 64) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
const b = a & 200;
const c = b === 64;
if (c) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y === 64;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
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
