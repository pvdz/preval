# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
var x;
{
  let tmpAssignLogicStmtOr = 1;
  if (tmpAssignLogicStmtOr) {
    x = 2;
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
x = 2;
tmpArg = x;
$(tmpArg);
`````
