# Preval test case

# regression.md

> Bit hacks > Or xor > Regression
>
> Figuring out why this is broken

The or-xor was broken for lets

## Input

`````js filename=intro
let x = +$(1); // Make x an unknown number
if ($) {
  // Keep x a let, keep it a number
  $(x);
  x = +$(2);
}
if ($(true)) {
  // This is the actual test. With x a let, the or-xor trick should still apply and this should be an AND
  const t = x | 256;
  x = t ^ 256;
  $(x)
} else {
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
let x /*:number*/ = +tmpUnaryArg;
if ($) {
  $(x);
  const tmpUnaryArg$1 /*:unknown*/ = $(2);
  x = +tmpUnaryArg$1;
} else {
}
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:number*/ = x & -257;
  $(tmpClusterSSA_x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
let x = +tmpUnaryArg;
if ($) {
  $(x);
  const tmpUnaryArg$1 = $(2);
  x = +tmpUnaryArg$1;
}
if ($(true)) {
  $(x & -257);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = +a;
if ($) {
  $( b );
  const c = $( 2 );
  b = +c;
}
const d = $( true );
if (d) {
  const e = b & -257;
  $( e );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: true
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
