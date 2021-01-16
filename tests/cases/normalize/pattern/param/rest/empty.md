# Preval test case

# empty.md

> normalize > pattern >  > param > rest > empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f(...x) {
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f(...x) {
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
