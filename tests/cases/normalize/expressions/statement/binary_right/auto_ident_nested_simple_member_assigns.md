# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > binary_right > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(100) + (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
$(100);
const tmpAssignMemLhsObj = b;
let tmpAssignMemRhs;
let tmpNestedAssignPropRhs;
let tmpNestedAssignPropRhs$1;
let tmpNestedAssignPropRhs$2;
let tmpNestedAssignPropRhs$3;
const tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
b.x = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
b.x = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$4;
tmpAssignMemRhs = tmpNestedPropAssignRhs$4;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
$(100);
const tmpAssignMemLhsObj = b;
let tmpAssignMemRhs;
let tmpNestedAssignPropRhs;
let tmpNestedAssignPropRhs$1;
let tmpNestedAssignPropRhs$2;
let tmpNestedAssignPropRhs$3;
const tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
b.x = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
b.x = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$4;
tmpAssignMemRhs = tmpNestedPropAssignRhs$4;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
