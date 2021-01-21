# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) && 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var x;
{
  let tmpAssignLogicStmtOr = $(1);
  if (tmpAssignLogicStmtOr) {
    tmpNestedComplexRhs = 2;
  } else {
    tmpNestedComplexRhs = tmpAssignLogicStmtOr;
  }
}
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var x;
let tmpAssignLogicStmtOr = $(1);
if (tmpAssignLogicStmtOr) {
  tmpNestedComplexRhs = 2;
} else {
  tmpNestedComplexRhs = tmpAssignLogicStmtOr;
}
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
