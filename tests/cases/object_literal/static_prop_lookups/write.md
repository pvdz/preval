# Preval test case

# write.md

> Object literal > Static prop lookups > Write
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const o = {x: $(1)};
$(o.x = 2);
`````

## Pre Normal

`````js filename=intro
const o = { x: $(1) };
$((o.x = 2));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const tmpCallCallee = $;
const varInitAssignLhsComputedRhs = 2;
o.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
o.x = 2;
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
