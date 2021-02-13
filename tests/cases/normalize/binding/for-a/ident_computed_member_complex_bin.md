# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > for-a > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = $(b)[$('x')] = c + d;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedRhs = c + d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Output

`````js filename=intro
let b = { x: 2 };
{
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedRhs = 3 + 4;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
}
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
