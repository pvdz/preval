# Preval test case

# default_yes_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f(''));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'pass2' };
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('');
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
