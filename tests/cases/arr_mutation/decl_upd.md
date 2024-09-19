# Preval test case

# decl_upd.md

> Arr mutation > Decl upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
arr[0] = 1;
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [];
arr[0] = 1;
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [];
arr[0] = 1;
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
