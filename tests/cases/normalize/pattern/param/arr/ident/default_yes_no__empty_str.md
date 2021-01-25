# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > ident > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')]) {
  return x;
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f('', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
tmpArg = f('', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
