# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > logic-right > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a[$('x')] = b + c));
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
  tmpAssignComputedObj = a;
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
 - 0: true
 - 1: "x"
 - 2: 5
 - 3: {"x":10,"undefined":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], ['x'], [5], [{ x: 10, undefined: 5 }, 5, 3], null];

