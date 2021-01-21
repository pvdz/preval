# Preval test case

# sequence-simple.md

> normalize > assignment > logic-right > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$($(true) || ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a;
    tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = d;
    tmpArg = d;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
let b = { c: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpArg = 3;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: 1,{"c":2},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
