# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let d = 4;
  const tmpNestedAssignObj = $(c);
  const tmpNestedAssignPropRhs = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  b = tmpNestedPropAssignRhs;
  let a = b;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let d = 4;
  const tmpNestedAssignObj = $(c);
  const tmpNestedAssignPropRhs = $(d);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  b = tmpNestedAssignPropRhs;
  let a = b;
  $(a, b, c);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - 4: 4, 4, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
