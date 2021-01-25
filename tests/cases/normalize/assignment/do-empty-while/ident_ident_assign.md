# Preval test case

# ident_ident_assign.md

> normalize > assignment > do-while > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 0, d = 0;
do {} while (a = b = $(c).y = d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = 2;
let c = 0;
let d = 0;
while (true) {
  tmpNestedAssignObj = $(c);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = 2;
while (true) {
  tmpNestedAssignObj = $(0);
  tmpNestedPropAssignRhs = 0;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 0);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 0,0,0
 - 2: undefined

Normalized calls: Same

Final output calls: Same
