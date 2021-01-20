# Preval test case

# default_yes_yes__str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_yes__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = 1 }) {
  return y;
}
f('abc');
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      objPatternAfterDefault = 1;
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
f('abc');
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    objPatternAfterDefault = 1;
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
f('abc');
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
