# Preval test case

# base.md

> Normalize > Object > Dupe props > Base
>
> Duplicate properties are legal but useless. We should get rid of them.

#TODO

## Input

`````js filename=intro
const x = {a: 1, a: 2};
$(x);
`````

## Pre Normal

`````js filename=intro
const x = { a: 1, a: 2 };
$(x);
`````

## Normalized

`````js filename=intro
const x = { a: 2 };
$(x);
`````

## Output

`````js filename=intro
const x = { a: 2 };
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
