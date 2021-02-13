# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > stmt > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = b.x = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedRhs = c + d;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
const varInitAssignLhsComputedRhs = 3 + 4;
b.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b, 3);
`````

## Result

Should call `$` with:
 - 1: 7, { x: '7' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
