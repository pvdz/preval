# Preval test case

# base_falsy_right_shift.md

> Type tracked > If > Base falsy right shift
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

This is somewhat special insofar that the result can not be NaN and cannot be -0 so must be 0?

## Input

`````js filename=intro
const x = $(1) >>> 0; // "we know x is a number and if falsy, it must be zero.
if (x) {
  // x can not be 0 or -0 or NaN
  $(x, 'fail1');
} else {
  // x is 0 (!). It cannot be signed, and bitwise ops do not leave NaNs.
  if (x) {
    $(x, 'fail2');
  } else {
    $(x, 'pass');
  }
}
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(1);
const x /*:number*/ = tmpBinLhs >>> 0;
if (x) {
  $(x, `fail1`);
} else {
  $(x, `pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1) >>> 0;
if (x) {
  $(x, `fail1`);
} else {
  $(x, `pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a >>> 0;
if (b) {
  $( b, "fail1" );
}
else {
  $( b, "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $(1);
const x = tmpBinLhs >>> 0;
if (x) {
  $(x, `fail1`);
} else {
  $(x, `pass`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'fail1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
