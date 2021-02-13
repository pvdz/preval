# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > for-a > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = $(b)[$('x')] = c;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
