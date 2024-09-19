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
const tmpBinLhs = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const twoten /*:number*/ = Math.pow(2, ten);
const zero /*:number*/ = 0 * twoten;
const divvy /*:number*/ = zero / 695;
const sinned /*:number*/ = Math.sin(divvy);
const lottasin /*:number*/ = 1000000 * sinned;
const minned /*:number*/ = Math.min(10000, lottasin);
const maxed /*:number*/ = Math.max(-10000, minned);
$(maxed);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 120 );
const b = a / 12;
const c = Math.pow( 2, b );
const d = 0 * c;
const e = d / 695;
const f = Math.sin( e );
const g = 1000000 * f;
const h = Math.min( 10000, g );
const i = Math.max( -10000, h );
$( i );
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
