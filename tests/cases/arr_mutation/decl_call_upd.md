# Preval test case

# decl_call_upd.md

> Arr mutation > Decl call upd
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
const arr = [1];
$(arr);
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
