# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 || $(2));
`````

## Normalized

`````js filename=intro
var tmpArg;
var x;
{
  let tmpAssignLogicStmtOr = 1;
  if (tmpAssignLogicStmtOr) {
    x = tmpAssignLogicStmtOr;
  } else {
    x = $(2);
  }
}
tmpArg = x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var x;
x = 1;
tmpArg = x;
$(tmpArg);
`````
