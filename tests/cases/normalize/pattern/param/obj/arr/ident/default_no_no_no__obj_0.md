# Preval test case

# default_no_no_no__obj_0.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f({ x: 0, a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
var tmpArg$1;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = { x: 0, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: 0, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

