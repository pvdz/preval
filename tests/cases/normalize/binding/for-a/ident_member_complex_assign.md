# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > for-a > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = $(b).x = $(c).y = $(d);false;) $(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 3
 - 3: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same