# Preval test case

# default_yes_yes_yes__null.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['fail3'])) {
  return 'bad';
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail3'];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
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
    return 'bad';
  } else {
    x = arrPatternBeforeDefault$1;
    return 'bad';
  }
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(null, 200);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail3'];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
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
    $('fail');
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$2 = f(null, 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
