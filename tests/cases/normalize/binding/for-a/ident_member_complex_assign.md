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
  let a_1;
  const tmpNestedAssignObj = $(b);
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignObj$1 = $(c);
  let tmpNestedAssignPropRhs$1 = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
  a_1 = tmpNestedPropAssignRhs$1;
}
`````

## Output

`````js filename=intro
let b = { x: 2 };
let a_1;
const tmpNestedAssignObj = $(b);
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj$1 = $(3);
let tmpNestedAssignPropRhs$1 = $(4);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
a_1 = tmpNestedPropAssignRhs$1;
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 3
 - 3: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
