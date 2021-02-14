# Preval test case

# minus_number.md

> constants > minus_number
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

## Normalized

`````js filename=intro
const x = $(5);
const tmpUnaryArg = -x;
const y = -tmpUnaryArg;
const z = y;
$(z);
`````

## Output

`````js filename=intro
const x = $(5);
const tmpUnaryArg = -x;
const y = -tmpUnaryArg;
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
