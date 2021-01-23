# Preval test case

# member_simple_simple.md

> normalize > assignment > ternary-c > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(false) ? true : (a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedPropAssignRhs;
var tmpTernaryAlternate;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedPropAssignRhs = b;
  a.x = tmpNestedPropAssignRhs;
  tmpTernaryAlternate = tmpNestedPropAssignRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedPropAssignRhs;
var tmpTernaryAlternate;
var tmpTernaryTest;
let a = { x: 10 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedPropAssignRhs = 2;
  a.x = tmpNestedPropAssignRhs;
  tmpTernaryAlternate = tmpNestedPropAssignRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: 2
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
