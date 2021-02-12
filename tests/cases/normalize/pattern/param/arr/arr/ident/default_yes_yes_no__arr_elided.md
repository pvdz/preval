# Preval test case

# default_yes_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([, , , , 4, 5], 200));
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
    const tmpCalleeParam = ['pass2'];
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [, , , , 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['pass2'];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [, , , , 4, 5];
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, 200);
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
