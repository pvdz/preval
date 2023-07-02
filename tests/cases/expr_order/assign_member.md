# Preval test case

# assign_member.md

> Expr order > Assign member
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let a = {};
a.foo = a = $();
$(a);
`````

## Pre Normal

`````js filename=intro
let a = {};
a.foo = a = $();
$(a);
`````

## Normalized

`````js filename=intro
let a = {};
const tmpAssignMemLhsObj = a;
a = $();
let tmpAssignMemRhs = a;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpClusterSSA_a = $();
const a = {};
a.foo = tmpClusterSSA_a;
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
