# Preval test case

# base.md

> normalize > pattern >  > param > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'ok';
}
$(f([1, 2, 3], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = [1, 2, 3];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
tmpArg$1 = [1, 2, 3];
tmpArg = 'ok';
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
