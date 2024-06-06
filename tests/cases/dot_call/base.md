# Preval test case

# base.md

> Dot call > Base
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x);
`````

## Normalized


`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x);
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
