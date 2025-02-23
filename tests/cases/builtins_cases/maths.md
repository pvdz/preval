# Preval test case

# maths.md

> Builtins cases > Maths
>
>

## Input

`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, 10000, lottasin);
const maxed = $dotCall(max, Math, -10000, minned);
$(maxed);
`````

## Pre Normal


`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, 10000, lottasin);
const maxed = $dotCall(max, Math, -10000, minned);
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
const twoten = $dotCall(pow, Math, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, 10000, lottasin);
const maxed = $dotCall(max, Math, -10000, minned);
$(maxed);
`````

## Output


`````js filename=intro
const tmpFree /*:()=>number*/ = function $free() {
  debugger;
  const twoten /*:number*/ = Math.pow(2, ten);
  const zero /*:number*/ = 0 * twoten;
  const divvy /*:number*/ = zero / 695;
  const sinned /*:number*/ = Math.sin(divvy);
  const lottasin /*:number*/ = 1000000 * sinned;
  const minned /*:number*/ = Math.min(10000, lottasin);
  const tmpRet /*:number*/ = Math.max(-10000, minned);
  return tmpRet;
};
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const maxed /*:number*/ = $frfr(tmpFree);
$(maxed);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = Math.pow( 2, d );
  const e = 0 * c;
  const f = e / 695;
  const g = Math.sin( f );
  const h = 1000000 * g;
  const i = Math.min( 10000, h );
  const j = Math.max( -10000, i );
  return j;
};
const k = $( 120 );
const d = k / 12;
const l = m( a );
$( l );
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
