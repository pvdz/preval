# Preval test case

# delete.md

> Obj mutation > Delete
>
> Testing the inlining of objlit mutations

#TODO

## Input

`````js filename=intro
const blob = {thing: 'bloop'};
delete blob.thing;
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `bloop` };
delete blob.thing;
`````

## Normalized

`````js filename=intro
const blob = { thing: `bloop` };
delete blob.thing;
`````

## Output

`````js filename=intro
const blob = { thing: `bloop` };
delete blob.thing;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
