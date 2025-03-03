# Preval test case

# freefree.md

> Tofix > freefree

existing case

this is a regression. the result used to have one frfr call. now it has two.

## Input

`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, 'pow', 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, 'sin', divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, 'min', 10000, lottasin);
const maxed = $dotCall(max, Math, 'max', -10000, minned);
$(maxed);
`````

## Pre Normal


`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, `pow`, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, `sin`, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, `min`, 10000, lottasin);
const maxed = $dotCall(max, Math, `max`, -10000, minned);
$(maxed);
`````

## Normalized


`````js filename=intro
const max = $Math_max;
const min = $Math_min;
const sin = $Math_sin;
const pow = $Math_pow;
const tmpBinLhs = $(120);
const ten = tmpBinLhs / 12;
const twoten = $dotCall(pow, Math, `pow`, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, `sin`, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, `min`, 10000, lottasin);
const maxed = $dotCall(max, Math, `max`, -10000, minned);
$(maxed);
`````

## Output


`````js filename=intro
const tmpFree$2 /*:()=>number*/ = function $free() {
  debugger;
  const divvy /*:number*/ = zero / 695;
  const tmpRet /*:number*/ = $Math_sin(divvy);
  const lottasin /*:number*/ = 1000000 * tmpRet;
  const minned /*:number*/ = $Math_min(10000, lottasin);
  const tmpRet$2 /*:number*/ = $Math_max(-10000, minned);
  return tmpRet$2;
};
const tmpFree$1 /*:()=>number*/ = function $free() {
  debugger;
  const twoten /*:number*/ = $Math_pow(2, ten);
  const tmpRet$1 /*:number*/ = 0 * twoten;
  return tmpRet$1;
};
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const zero /*:number*/ = $frfr(tmpFree$1);
const maxed /*:number*/ = $frfr(tmpFree$2);
$(maxed);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d / 695;
  const e = $Math_sin( c );
  const f = 1000000 * e;
  const g = $Math_min( 10000, f );
  const h = $Math_max( -10000, g );
  return h;
};
const i = function b() {
  debugger;
  const j = $Math_pow( 2, k );
  const l = 0 * j;
  return l;
};
const m = $( 120 );
const k = m / 12;
const d = n( i );
const o = n( a );
$( o );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 120
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
