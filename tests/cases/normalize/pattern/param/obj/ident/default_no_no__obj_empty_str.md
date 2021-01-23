# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f({ x: '' }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: '' };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: '' };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: ""
 - 1: undefined

Normalized calls: Same

Final output calls: Same
