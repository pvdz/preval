# Preval test case

# default_yes_yes__arr_null.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f([null, 201], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail2');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = null;
const tmpCalleeParam$1 = [tmpArrElement, 201];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail2');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [null, 201];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
