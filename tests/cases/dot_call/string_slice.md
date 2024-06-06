# Preval test case

# string_slice.md

> Dot call > String slice
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const str = "worldy";
const tmpCallVal = str.slice;
const x = $dotCall(tmpCallVal, str, 2, 4);
$(x);
`````

## Pre Normal


`````js filename=intro
const str = `worldy`;
const tmpCallVal = str.slice;
const x = $dotCall(tmpCallVal, str, 2, 4);
$(x);
`````

## Normalized


`````js filename=intro
const str = `worldy`;
const tmpCallVal = str.slice;
const x = $dotCall(tmpCallVal, str, 2, 4);
$(x);
`````

## Output


`````js filename=intro
$(`rl`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "rl" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'rl'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
