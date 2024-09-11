# Preval test case

# nested_empty_array_plustr.md

> Coerce > Array > Nested empty array plustr

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, 'plustr');
$(c);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `plustr`);
$(c);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `plustr`);
$(c);
`````

## Output


`````js filename=intro
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
