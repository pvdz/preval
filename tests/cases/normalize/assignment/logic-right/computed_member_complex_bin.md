# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > logic-right > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || ($(a)[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignComputedObj = $(a);
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = b + c;
    tmpNestedAssignObj = tmpAssignComputedObj;
    tmpNestedAssignObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    tmpArg = tmpAssignComputedRhs;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignComputedObj = $(a);
  tmpAssignComputedProp = $('x');
  tmpAssignComputedRhs = 5;
  tmpNestedAssignObj = tmpAssignComputedObj;
  tmpNestedAssignObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  tmpArg = tmpAssignComputedRhs;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[true], [{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
