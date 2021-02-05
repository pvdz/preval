# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > arr_element > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) +
  (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
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
const tmpAssignMemLhsObj$1 = b;
let tmpAssignMemRhs$1;
let tmpNestedAssignPropRhs$4;
let tmpNestedAssignPropRhs$5;
let tmpNestedAssignPropRhs$6;
let tmpNestedAssignPropRhs$7;
const tmpNestedPropAssignRhs$5 = c;
b.x = tmpNestedPropAssignRhs$5;
tmpNestedAssignPropRhs$7 = tmpNestedPropAssignRhs$5;
const tmpNestedPropAssignRhs$6 = tmpNestedAssignPropRhs$7;
b.x = tmpNestedPropAssignRhs$6;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$6;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$6;
b.x = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$5;
b.x = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$4;
b.x = tmpNestedPropAssignRhs$9;
tmpAssignMemRhs$1 = tmpNestedPropAssignRhs$9;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = b;
let tmpAssignMemRhs;
let tmpNestedAssignPropRhs;
let tmpNestedAssignPropRhs$1;
let tmpNestedAssignPropRhs$2;
let tmpNestedAssignPropRhs$3;
b.x = 3;
tmpNestedAssignPropRhs$3 = 3;
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
const tmpAssignMemLhsObj$1 = b;
let tmpAssignMemRhs$1;
let tmpNestedAssignPropRhs$4;
let tmpNestedAssignPropRhs$5;
let tmpNestedAssignPropRhs$6;
let tmpNestedAssignPropRhs$7;
b.x = 3;
tmpNestedAssignPropRhs$7 = 3;
const tmpNestedPropAssignRhs$6 = tmpNestedAssignPropRhs$7;
b.x = tmpNestedPropAssignRhs$6;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$6;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$6;
b.x = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$5;
b.x = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$4;
b.x = tmpNestedPropAssignRhs$9;
tmpAssignMemRhs$1 = tmpNestedPropAssignRhs$9;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
