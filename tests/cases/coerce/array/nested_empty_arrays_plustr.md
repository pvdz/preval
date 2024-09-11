# Preval test case

# nested_empty_arrays_plustr.md

> Coerce > Array > Nested empty arrays plustr

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, 'plustr');
$(f);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `plustr`);
$(f);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `plustr`);
$(f);
`````

## Output


`````js filename=intro
$(`,`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "," );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ','
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
