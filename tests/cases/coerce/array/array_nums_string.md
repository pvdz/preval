# Preval test case

# array_nums_string.md

> Coerce > Array > Array nums string

## Input

`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, 'string');
$(b);
`````

## Pre Normal


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `string`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `string`);
$(b);
`````

## Output


`````js filename=intro
$(`1,2,3`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1,2,3" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
