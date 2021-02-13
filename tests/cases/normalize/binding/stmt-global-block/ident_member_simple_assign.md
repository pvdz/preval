# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > stmt > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = b.x = $(c).y = $(d);
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs$1;
  let a = varInitAssignLhsComputedRhs$1;
  $(a, b, c);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - 4: 4, { x: '4' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
