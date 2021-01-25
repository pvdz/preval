# Preval test case

# default_yes_no_no__str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
