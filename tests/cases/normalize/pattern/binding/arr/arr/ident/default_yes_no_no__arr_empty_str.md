# Preval test case

# default_yes_no_no__arr_empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('pass')]] = ['', 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat_1[0];
let x;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat_1[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: Same

Final output calls: Same
