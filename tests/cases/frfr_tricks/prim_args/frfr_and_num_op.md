# Preval test case

# frfr_and_num_op.md

> Frfr tricks > Prim args > Frfr and num op
>
> The literal arg should be eliminated and propagated through the frfr call

## Input

`````js filename=intro
const freeFunc1 = function $free(x, y) {
  return y * (x + 287);
};
let limiter = 0;
while (true) {
  const a = $frfr(freeFunc1, 1, limiter);
  const b = limiter % 41344;
  $(unknown);
  $(a + b);
  limiter = $(1) | 0;
}
`````

## Settled


`````js filename=intro
let limiter /*:number*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:number*/ = limiter * 288;
  const b /*:number*/ = limiter % 41344;
  $(unknown);
  const tmpCalleeParam /*:number*/ = a + b;
  $(tmpCalleeParam);
  const tmpBinLhs /*:unknown*/ = $(1);
  limiter = tmpBinLhs | 0;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let limiter = 0;
while (true) {
  const a = limiter * 288;
  const b = limiter % 41344;
  $(unknown);
  $(a + b);
  limiter = $(1) | 0;
}
`````

## Pre Normal


`````js filename=intro
const freeFunc1 = function $free($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  return y * (x + 287);
};
let limiter = 0;
while (true) {
  const a = $frfr(freeFunc1, 1, limiter);
  const b = limiter % 41344;
  $(unknown);
  $(a + b);
  limiter = $(1) | 0;
}
`````

## Normalized


`````js filename=intro
const freeFunc1 = function $free($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const tmpBinBothLhs = y;
  const tmpBinBothRhs = x + 287;
  const tmpReturnArg = tmpBinBothLhs * tmpBinBothRhs;
  return tmpReturnArg;
};
let limiter = 0;
while (true) {
  const a = $frfr(freeFunc1, 1, limiter);
  const b = limiter % 41344;
  $(unknown);
  const tmpCalleeParam = a + b;
  $(tmpCalleeParam);
  const tmpBinLhs = $(1);
  limiter = tmpBinLhs | 0;
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a * 288;
  const c = a % 41344;
  $( unknown );
  const d = b + c;
  $( d );
  const e = $( 1 );
  a = e | 0;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
