# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])]) {
  return x;
}
$(f('abc', 200));
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
    const tmpCalleeParam = ['fail2'];
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
const tmpCalleeParam$1 = f('abc', 200);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
