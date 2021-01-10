# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) || 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
var x;
{
  let tmpAssignLogicStmtOr = $(1);
  if (tmpAssignLogicStmtOr) {
    x = tmpAssignLogicStmtOr;
  } else {
    x = 2;
  }
}
tmpArg = x;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
{
  var x = x(8);
  if (x) {
    x = x;
  } else {
    x = 8;
  }
}
x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var x;
let tmpAssignLogicStmtOr = $(1);
if (tmpAssignLogicStmtOr) {
  x = tmpAssignLogicStmtOr;
} else {
  x = 2;
}
tmpArg = x;
$(tmpArg);
`````
