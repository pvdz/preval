# Preval test case

# default_yes_yes_yes__arr_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f(['abc', 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail3'];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$2 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$2) {
    x = $('fail');
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = ['abc', 4, 5];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail3'];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = ['fail2'];
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$2 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$2) {
    const SSA_x = $('fail');
    return SSA_x;
  } else {
    return arrPatternBeforeDefault$1;
  }
};
const tmpCalleeParam$3 = ['abc', 4, 5];
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
