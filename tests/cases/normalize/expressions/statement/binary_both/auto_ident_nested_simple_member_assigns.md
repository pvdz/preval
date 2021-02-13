# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > binary_both > auto_ident_nested_simple_member_assigns
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
const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpAssignMemLhsObj$1 = b;
const varInitAssignLhsComputedRhs$9 = c;
b.x = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$8 = varInitAssignLhsComputedRhs$9;
b.x = varInitAssignLhsComputedRhs$8;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$8;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$6 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$6;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$6;
b.x = varInitAssignLhsComputedRhs$5;
const tmpAssignMemRhs$1 = varInitAssignLhsComputedRhs$5;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
