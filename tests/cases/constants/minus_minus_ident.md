# Preval test case

# minus_minus_ident.md

> Constants > Minus minus ident
>
> Double negative is positive. On a number that should have no observable side effects. On an ident that may trigger coercion.

#TODO

## Input

`````js filename=intro
const x = $(5);
const y = -(-(x));
const z = y;
$(z); // Should be inlined to y, not -5
`````

## Pre Normal

`````js filename=intro
const x = $(5);
const y = -(-x);
const z = y;
$(z);
`````

## Normalized

`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z);
`````

## Output

`````js filename=intro
const x = $(5);
const y = +x;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
const b = +a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
