# Preval test case

# member_simple_simple.md

> normalize > assignment > ternary-b > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) ? (a.x = b) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedPropAssignRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedPropAssignRhs = b;
  a.x = tmpNestedPropAssignRhs;
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
var tmpNestedPropAssignRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = { x: 10 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedPropAssignRhs = 2;
  a.x = tmpNestedPropAssignRhs;
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
 - 1: 2
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
