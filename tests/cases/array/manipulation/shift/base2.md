# Preval test case

# base2.md

> Array > Manipulation > Shift > Base2

A regression was causing array.shift() to be identified as returning an array.

## Input

`````js filename=intro
const arr1 = [`a`, `b`, `c`];
const secretArr = $(arr1);
const ARR = [...secretArr];
const NOT_AN_ARRAY = ARR.shift(); // Some times you have to be explicit ;)
$(NOT_AN_ARRAY);

`````

## Pre Normal


`````js filename=intro
const arr1 = [`a`, `b`, `c`];
const secretArr = $(arr1);
const ARR = [...secretArr];
const NOT_AN_ARRAY = ARR.shift();
$(NOT_AN_ARRAY);
`````

## Normalized


`````js filename=intro
const arr1 = [`a`, `b`, `c`];
const secretArr = $(arr1);
const ARR = [...secretArr];
const NOT_AN_ARRAY = ARR.shift();
$(NOT_AN_ARRAY);
`````

## Output


`````js filename=intro
const arr1 /*:array*/ = [`a`, `b`, `c`];
const secretArr /*:unknown*/ = $(arr1);
const ARR /*:array*/ = [...secretArr];
const NOT_AN_ARRAY /*:unknown*/ = ARR.shift();
$(NOT_AN_ARRAY);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $( a );
const c = [ ...b ];
const d = c.shift();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
