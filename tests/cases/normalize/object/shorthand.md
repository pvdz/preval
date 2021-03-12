# Preval test case

# shorthand.md

> Normalize > Object > Shorthand
>
> Shorthand should normalize to a regular property

#TODO

## Input

`````js filename=intro
const x = 10;
const obj = {x};
$(obj);
`````

## Pre Normal

`````js filename=intro
const x = 10;
const obj = { x };
$(obj);
`````

## Normalized

`````js filename=intro
const x = 10;
const obj = { x: x };
$(obj);
`````

## Output

`````js filename=intro
const obj = { x: 10 };
$(obj);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
