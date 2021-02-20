# Preval test case

# assign_member.md

> Expr order > Assign member
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

`````js filename=intro
let a = {};
a.foo = a = $();
`````

## Normalized

`````js filename=intro
let a = {};
const tmpAssignMemLhsObj = a;
a = $();
let tmpAssignMemRhs = a;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
const a = {};
const SSA_a = $();
a.foo = SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
