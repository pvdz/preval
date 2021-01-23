# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > logic-both > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b) && (a[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp;
var tmpAssignComMemLhsProp$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignComMemLhsObj = a;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
  let tmpAssignLogicStmtOr = b;
  if (tmpAssignLogicStmtOr) {
    tmpAssignComMemLhsObj$1 = a;
    tmpAssignComMemLhsProp$1 = $('x');
    tmpNestedPropAssignRhs = b;
    tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp;
var tmpAssignComMemLhsProp$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpAssignComMemLhsObj = a;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
tmpAssignComMemLhsObj$1 = a;
tmpAssignComMemLhsProp$1 = $('x');
tmpNestedPropAssignRhs = 2;
tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 2
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
