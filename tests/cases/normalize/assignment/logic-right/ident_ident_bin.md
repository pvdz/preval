# Preval test case

# ident_ident_bin.md

> normalize > assignment > logic-right > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$($(true) || (a = b = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpNestedComplexRhs = c + d;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    tmpArg = tmpNestedComplexRhs;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpNestedComplexRhs = 7;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  tmpArg = tmpNestedComplexRhs;
}
$(tmpArg);
$(a, b, 7);
`````
