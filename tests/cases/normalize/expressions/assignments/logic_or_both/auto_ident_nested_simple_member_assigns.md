# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = b.x = b.x = b.x = b.x = b.x = b.x = c) ||
    (a = b.x = b.x = b.x = b.x = b.x = b.x = c)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$((a = b.x = b.x = b.x = b.x = b.x = b.x = c) || (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const varInitAssignLhsComputedRhs$10 = c;
  b.x = varInitAssignLhsComputedRhs$10;
  const varInitAssignLhsComputedRhs$9 = varInitAssignLhsComputedRhs$10;
  b.x = varInitAssignLhsComputedRhs$9;
  const varInitAssignLhsComputedRhs$8 = varInitAssignLhsComputedRhs$9;
  b.x = varInitAssignLhsComputedRhs$8;
  const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$8;
  b.x = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$6 = varInitAssignLhsComputedRhs$7;
  b.x = varInitAssignLhsComputedRhs$6;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$6;
  b.x = varInitAssignLhsComputedRhs$5;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs$5;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
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
let SSA_a = 3;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  SSA_a = 3;
  tmpCalleeParam = 3;
}
$(tmpCalleeParam);
$(SSA_a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
