# Preval test case

# nested_empty_array_number.md

> Coerce > Array > Nested empty array number

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, 'number');
$(c);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `number`);
$(c);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `number`);
$(c);
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
