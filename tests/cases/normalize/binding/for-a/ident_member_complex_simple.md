# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > for-a > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = $(b).x = c;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Output

`````js filename=intro
let b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 3;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
