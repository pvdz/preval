# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Ternary b > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(1) ? (b.x = b.x = b.x = b.x = b.x = b.x = c) : $(200);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$(1) ? (b.x = b.x = b.x = b.x = b.x = b.x = c) : $(200);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignMemLhsObj = b;
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
  const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
} else {
  $(200);
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
} else {
  $(200);
}
$(a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
