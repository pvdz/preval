# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('pass') }) {
  return x;
}
$(f({ b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = { b: 2, c: 3 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { b: 2, c: 3 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
