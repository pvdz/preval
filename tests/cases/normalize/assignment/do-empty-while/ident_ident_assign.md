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
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 0;
let d = 0;
while (true) {
  {
    tmpNestedAssignObj = $(c);
    tmpNestedAssignObj.y = d;
    tmpNestedComplexRhs = d;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    let ifTestTmp = a;
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
while (true) {
  tmpNestedAssignObj = $(0);
  tmpNestedAssignObj.y = 0;
  tmpNestedComplexRhs = 0;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, b, 0);
`````

## Result

Should call `$` with:
[[0], "<crash[ Cannot set property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
