# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > ternary-b > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$($(true) ? (a = $(b).x = c) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
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
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"x":3}
 - 2: 3
 - 3: 3,{"x":3},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
