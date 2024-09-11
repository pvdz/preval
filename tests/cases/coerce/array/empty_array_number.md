# Preval test case

# empty_array_number.md

> Coerce > Array > Empty array number

## Input

`````js filename=intro
const a = [];
const b = $coerce(a, 'number');
$(b);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = $coerce(a, `number`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [];
const b = $coerce(a, `number`);
$(b);
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
