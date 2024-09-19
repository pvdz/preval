# Preval test case

# number.md

> Normalize > Object > Dupe props > Number
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {5: 1, 5: 2};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = { [5]: 1, [5]: 2 };
$(x);
`````

## Normalized


`````js filename=intro
const x = { [5]: 2 };
$(x);
`````

## Output


`````js filename=intro
const x /*:object*/ = { [5]: 2 };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 5 ]: 2 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 5: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
