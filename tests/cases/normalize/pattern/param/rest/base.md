# Preval test case

# base.md

> normalize > pattern >  > param > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
function f(...x) {
  return x;
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f(1, 2, 3);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(...x) {
  return x;
}
var tmpArg;
tmpArg = f(1, 2, 3);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [1,2,3]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
