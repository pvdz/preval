# Preval test case

# number.md

> Normalize > Object > Dupe props > Number
>
> Duplicate properties are legal but useless. We should get rid of them.

#TODO

## Input

`````js filename=intro
const x = {5: 1, 5: 2};
$(x);
`````

## Pre Normal

`````js filename=intro
const x = { 5: 1, 5: 2 };
$(x);
`````

## Normalized

`````js filename=intro
const x = { 5: 2 };
$(x);
`````

## Output

`````js filename=intro
const x = { 5: 2 };
$(x);
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
