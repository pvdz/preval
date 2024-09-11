# Preval test case

# array_nums_plustr.md

> Coerce > Array > Array nums plustr

## Input

`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, 'plustr');
$(b);
`````

## Pre Normal


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `plustr`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `plustr`);
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
