# Preval test case

# frfr_and_num_op.md

> Tofix > frfr and num op
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
  limiter = $(1);
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
  limiter = $(1);
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
  const tmpCallCallee = $;
  const tmpCalleeParam = a + b;
  tmpCallCallee(tmpCalleeParam);
  limiter = $(1);
}
`````

## Output


`````js filename=intro
const freeFunc1 /*:(number, unknown)=>number*/ = function $free($$0, $$1) {
  const x /*:number*/ = $$0;
  const y /*:unknown*/ = $$1;
  debugger;
  const tmpBinBothRhs /*:number*/ = x + 287;
  const tmpReturnArg /*:number*/ = y * tmpBinBothRhs;
  return tmpReturnArg;
};
let limiter /*:unknown*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:number*/ = $frfr(freeFunc1, 1, limiter);
  const b /*:number*/ = limiter % 41344;
  $(unknown);
  const tmpCalleeParam /*:number*/ = a + b;
  $(tmpCalleeParam);
  limiter = $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c + 287;
  const f = d * e;
  return f;
};
let g = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const h = i( a, 1, g );
  const j = g % 41344;
  $( unknown );
  const k = h + j;
  $( k );
  g = $( 1 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
