# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b.x = b.x = b.x = b.x = b.x = b.x = c)["a"];
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
let obj = {};
(a = b.x = b.x = b.x = b.x = b.x = b.x = c)['a'];
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let obj = {};
const varInitAssignLhsComputedRhs$4 = c;
b.x = varInitAssignLhsComputedRhs$4;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
(3).a;
$(3, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
