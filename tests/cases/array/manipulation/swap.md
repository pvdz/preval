# Preval test case

# swap.md

> Array > Manipulation > Swap
>
> Push a number to an array

#TODO

## Input

`````js filename=intro
const arr = [1, 2];
arr.push(arr.shift());
$(arr);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2];
arr.push(arr.shift());
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [1, 2];
const tmpCallObj = arr;
const tmpCallVal = tmpCallObj.push;
const tmpCalleeParam = arr.shift();
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
$(arr);
`````

## Output

`````js filename=intro
const arr = [2, 1];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 2, 1,, ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
