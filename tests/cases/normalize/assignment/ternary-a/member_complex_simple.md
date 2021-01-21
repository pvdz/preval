# Preval test case

# member_complex_simple.md

> normalize > assignment > ternary-a > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$( ($(a).x = b ) ? true : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = b;
tmpTernaryTest = b;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpTernaryTest = 2;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: true
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
