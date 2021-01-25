# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) }) {
  return y;
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = { y: 'pass2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return y;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f('abc', 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = { y: 'pass2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return y;
}
var tmpArg$1;
tmpArg$1 = f('abc', 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: {"y":"pass2"}
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
