# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) && $(2));
`````

## Normalized

`````js filename=intro
var tmpArg;
var x;
{
  let tmpAssignLogicStmtOr = $(1);
  if (tmpAssignLogicStmtOr) {
    x = $(2);
  } else {
    x = tmpAssignLogicStmtOr;
  }
}
tmpArg = x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var x;
let tmpAssignLogicStmtOr = $(1);
if (tmpAssignLogicStmtOr) {
  x = $(2);
} else {
  x = tmpAssignLogicStmtOr;
}
tmpArg = x;
$(tmpArg);
`````
