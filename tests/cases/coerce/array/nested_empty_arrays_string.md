# Preval test case

# nested_empty_arrays_string.md

> Coerce > Array > Nested empty arrays string

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, 'string');
$(f);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `string`);
$(f);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `string`);
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
