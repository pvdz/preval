# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = b.x = b.x = b.x = b.x = b.x = b.x = c) &&
    (a = b.x = b.x = b.x = b.x = b.x = b.x = c)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$((a = b.x = b.x = b.x = b.x = b.x = b.x = c) && (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const varInitAssignLhsComputedRhs$7 = c;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedRhs$19 = c;
  b.x = varInitAssignLhsComputedRhs$19;
  const varInitAssignLhsComputedRhs$17 = varInitAssignLhsComputedRhs$19;
  b.x = varInitAssignLhsComputedRhs$17;
  const varInitAssignLhsComputedRhs$15 = varInitAssignLhsComputedRhs$17;
  b.x = varInitAssignLhsComputedRhs$15;
  const varInitAssignLhsComputedRhs$13 = varInitAssignLhsComputedRhs$15;
  b.x = varInitAssignLhsComputedRhs$13;
  const varInitAssignLhsComputedRhs$11 = varInitAssignLhsComputedRhs$13;
  b.x = varInitAssignLhsComputedRhs$11;
  const varInitAssignLhsComputedRhs$9 = varInitAssignLhsComputedRhs$11;
  b.x = varInitAssignLhsComputedRhs$9;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs$9;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
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
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
$(3);
$(3, b, 3);
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
