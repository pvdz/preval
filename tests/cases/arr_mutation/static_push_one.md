# Preval test case

# static_push_one.md

> Arr mutation > Static push one
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the number immediately.

## Input

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
