# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Assign > Minus one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Output

`````js filename=intro
const x = `${-1}`;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
