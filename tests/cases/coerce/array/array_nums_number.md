# Preval test case

# array_nums_number.md

> Coerce > Array > Array nums number

## Input

`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, 'number');
$(b);
`````

## Pre Normal


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `number`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `number`);
$(b);
`````

## Output


`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
