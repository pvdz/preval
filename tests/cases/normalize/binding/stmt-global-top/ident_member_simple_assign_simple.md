# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > stmt > ident_member_simple_simple
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
let a;
const tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
let c = 3;
let a;
const tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
