# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > logic-left > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = $(b).x = c) && $(true));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.x = c;
  a = c;
  let tmpAssignLogicStmtOr = c;
  if (tmpAssignLogicStmtOr) {
    tmpArg = $(true);
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
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.x = 3;
a = 3;
tmpArg = $(true);
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[{ x: 2 }], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
