# Preval test case

# ident_member_simple_assign_simple.md

> Normalize > Binding > Stmt-global-top > Ident member simple assign simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = b.x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
const varInitAssignLhsComputedRhs = c;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
b.x = 3;
$(3, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
