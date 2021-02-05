# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return 'bad';
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(undefined, 10);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  arrPatternSplat.slice(0);
  return 'bad';
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(undefined, 10);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
