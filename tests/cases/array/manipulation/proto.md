# Preval test case

# proto.md

> Array > Manipulation > Proto
>
> Push a number to an array

## Input

`````js filename=intro
const arr = [];
const push = arr.push;
arr.call(arr, 1);
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [];
const push = arr.push;
arr.call(arr, 1);
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [];
const push = arr.push;
arr.call(arr, 1);
$(arr);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [];
arr.call(arr, 1);
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
a.call( a, 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
