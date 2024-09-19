# Preval test case

# string.md

> Normalize > Object > Dupe props > String
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {'x': 1, 'x': 2};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = { [`x`]: 1, [`x`]: 2 };
$(x);
`````

## Normalized


`````js filename=intro
const x = { x: 2 };
$(x);
`````

## Output


`````js filename=intro
const x /*:object*/ = { x: 2 };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
