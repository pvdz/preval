# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > logic-right > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a[$('x')] = b));
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
    tmpAssignComputedObj = a;
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = b;
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
  tmpAssignComputedObj = a;
  tmpAssignComputedProp = $('x');
  tmpAssignComputedRhs = 2;
  tmpNestedAssignObj = tmpAssignComputedObj;
  tmpNestedAssignObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  tmpArg = tmpAssignComputedRhs;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[true], ['x'], [2], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
