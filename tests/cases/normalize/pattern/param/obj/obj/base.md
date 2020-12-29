# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = a } = b) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    arrPatternStep = a;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    arrPatternStep = a;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
