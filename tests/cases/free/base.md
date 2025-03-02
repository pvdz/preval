# Preval test case

# base.md

> Free > Base
>
> Base case for free function stuffs

The point is that the lines that are "predictable" get grouped into a $free function when there's more than two consectuve such lines.
There are some catches but this is the base case.

## Input

`````js filename=intro
let i = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const r = $(i);                               // unpredictable
  const n = r * 1;                              // unpredictable, but the result is a number
  const a = Math.pow(n, 2);                     // predictable, because n is a number
  const b = a / 2;                              // predictable, predictable because it uses a local predictable var
  const c = String(b);                          // predictable, predictable because it uses a local predictable var
  $(i, c);                                      // unpredictable etc, using predictable result
  i = i + 1;
  if (i > 10) break;
}
$(i);
`````

## Pre Normal


`````js filename=intro
let i = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const r = $(i);
  const n = r * 1;
  const a = Math.pow(n, 2);
  const b = a / 2;
  const c = String(b);
  $(i, c);
  i = i + 1;
  if (i > 10) break;
}
$(i);
`````

## Normalized


`````js filename=intro
let i = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const r = $(i);
  const n = r * 1;
  const a = $Math_pow(n, 2);
  const b = a / 2;
  const tmpStringFirstArg = b;
  const c = $coerce(tmpStringFirstArg, `string`);
  $(i, c);
  i = i + 1;
  const tmpIfTest = i > 10;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(i);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const n /*:number*/ = $$0;
  debugger;
  const a /*:number*/ = $Math_pow(n, 2);
  const b /*:number*/ = a / 2;
  const tmpRet /*:string*/ = $coerce(b, `string`);
  return tmpRet;
};
let i /*:number*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const r /*:unknown*/ = $(i);
  const n$1 /*:number*/ = r * 1;
  const c /*:string*/ = $frfr(tmpFree, n$1);
  $(i, c);
  i = i + 1;
  const tmpIfTest /*:boolean*/ = i > 10;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(i);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $Math_pow( c, 2 );
  const e = d / 2;
  const f = $coerce( e, "string" );
  return f;
};
let g = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const h = $( g );
  const i = h * 1;
  const j = k( a, i );
  $( g, j );
  g = g + 1;
  const l = g > 10;
  if (l) {
    break;
  }
}
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0, '0'
 - 3: 1
 - 4: 1, '0.5'
 - 5: 2
 - 6: 2, '2'
 - 7: 3
 - 8: 3, '4.5'
 - 9: 4
 - 10: 4, '8'
 - 11: 5
 - 12: 5, '12.5'
 - 13: 6
 - 14: 6, '18'
 - 15: 7
 - 16: 7, '24.5'
 - 17: 8
 - 18: 8, '32'
 - 19: 9
 - 20: 9, '40.5'
 - 21: 10
 - 22: 10, '50'
 - 23: 11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
