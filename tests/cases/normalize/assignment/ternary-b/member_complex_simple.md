# Preval test case

# member_complex_simple.md

> normalize > assignment > ternary-b > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) ? ($(a).x = b) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(a);
  tmpNestedPropAssignRhs = b;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpTernaryConsequent = tmpNestedPropAssignRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = { x: 10 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(a);
  tmpNestedPropAssignRhs = 2;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpTernaryConsequent = tmpNestedPropAssignRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"x":2}
 - 2: 2
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
