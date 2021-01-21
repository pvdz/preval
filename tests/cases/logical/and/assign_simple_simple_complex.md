# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var x;
{
  let tmpAssignLogicStmtOr = 1;
  if (tmpAssignLogicStmtOr) {
    tmpNestedComplexRhs = $(2);
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
tmpNestedComplexRhs = $(2);
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
