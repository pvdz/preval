# Preval test case

# empty_array_plustr.md

> Coerce > Array > Empty array plustr

## Input

`````js filename=intro
const a = [];
const b = $coerce(a, 'plustr');
$(b);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = $coerce(a, `plustr`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [];
const b = $coerce(a, `plustr`);
$(b);
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
