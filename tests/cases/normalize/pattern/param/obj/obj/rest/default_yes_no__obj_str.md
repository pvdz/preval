# Preval test case

# default_yes_no__obj_str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      tmpArg = { a: 'fail' };
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let y = objPatternRest(objPatternAfterDefault, [], undefined);
  return y;
}
var tmpArg$1;
var tmpArg$2;
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$2` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$2` decl without init>');
tmpArg$2 = { x: 'abc', b: 11, c: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'fail' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let y = objPatternRest(objPatternAfterDefault, [], undefined);
  return y;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = { x: 'abc', b: 11, c: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: {"0":"a","1":"b","2":"c"}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
