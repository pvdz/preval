# Preval test case

# ident_ident_assign.md

> normalize > assignment > for-a > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let a = b = $(c).y = $(d);false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let a_1;
  let tmpNestedComplexRhs;
  const tmpNestedAssignObj = $(c);
  let tmpNestedAssignPropRhs = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  b = tmpNestedComplexRhs;
  a_1 = tmpNestedComplexRhs;
}
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let a_1;
  let tmpNestedComplexRhs;
  const tmpNestedAssignObj = $(c);
  let tmpNestedAssignPropRhs = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  b = tmpNestedComplexRhs;
  a_1 = tmpNestedComplexRhs;
}
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
