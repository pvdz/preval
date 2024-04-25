# Preval test case

# array_push.md

> Dot call > Array push
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x, arr);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x, arr);
`````

## Normalized

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 3);
$(x, arr);
`````

## Output

`````js filename=intro
const arr = [1, 2, 3];
$(3, arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( 3, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
