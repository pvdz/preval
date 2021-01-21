# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > ternary-c > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$($(false) ? true : (a = $(b).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.x = c;
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.x = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: {"x":2}
 - 2: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
