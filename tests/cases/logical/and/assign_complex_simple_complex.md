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
var x;
{
  let tmpAssignLogicStmtOr = 1;
  if (tmpAssignLogicStmtOr) {
    x = $(2);
  } else {
    x = tmpAssignLogicStmtOr;
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
  var x = 8;
  if (x) {
    x = x(8);
  } else {
    x = x;
  }
}
x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var x;
x = $(2);
tmpArg = x;
$(tmpArg);
`````
