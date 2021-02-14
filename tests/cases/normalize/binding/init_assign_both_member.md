# Preval test case

# init_assign.md

> normalize > binding > init_assign
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c.x
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
const varInitAssignLhsComputedRhs = c.x;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
`````

## Output

`````js filename=intro
const varInitAssignLhsComputedRhs = (20).x;
(10).x = varInitAssignLhsComputedRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
