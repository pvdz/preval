# Preval test case

# complex_lhs.md

> normalize > assignment > complex_lhs
>
> Lhs of assignment can have side effects too

#TODO

## Input

`````js filename=intro
$({}).foo = 10;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = {};
const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## Output

`````js filename=intro
const tmpCalleeParam = {};
const tmpAssignMemLhsObj = $(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
