# Preval test case

# not_used_as_prop.md

> Object literal > Static prop lookups > Not used as prop
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const o = {x: $(1)};
$(o);
`````

## Pre Normal

`````js filename=intro
const o = { x: $(1) };
$(o);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
$(o);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
$(o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same