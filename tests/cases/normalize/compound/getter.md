# Preval test case

# getter.md

> Normalize > Compound > Getter
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
const obj = {
  x: 0
};
obj.x += 5;
$(obj.x); // 5
`````

## Pre Normal

`````js filename=intro
const obj = { x: 0 };
obj.x += 5;
$(obj.x);
`````

## Normalized

`````js filename=intro
const obj = { x: 0 };
const tmpCompoundAssignLhs = obj.x;
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpCallCallee = $;
const tmpCalleeParam = obj.x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(5);
`````

## PST Output

With rename=true

`````js filename=intro
$( 5 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
