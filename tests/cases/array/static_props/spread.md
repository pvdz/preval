# Preval test case

# spread.md

> Array > Static props > Spread
>
> Getting the length of an array can be tricky, and sometimes be done

Spreads in an array may affect the size in uncontrollable ways. We should wait until spreads are resolved or consider the array unpredictable.

## Input

`````js filename=intro
const arr = [1, 2, ...$([10, 20]), 3];
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, ...$([10, 20]), 3];
$(arr.length);
`````

## Normalized


`````js filename=intro
const tmpArrElement = 1;
const tmpArrElement$1 = 2;
const tmpCalleeParam = [10, 20];
const tmpArrSpread = $(tmpCalleeParam);
const arr = [tmpArrElement, tmpArrElement$1, ...tmpArrSpread, 3];
const tmpCalleeParam$1 = arr.length;
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const arr /*:array*/ = [1, 2, ...tmpArrSpread, 3];
const tmpCalleeParam$1 /*:number*/ = arr.length;
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $( a );
const c = [ 1, 2, ...b, 3 ];
const d = c.length;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
