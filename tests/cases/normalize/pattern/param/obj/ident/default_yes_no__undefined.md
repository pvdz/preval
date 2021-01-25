# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
