# Preval test case

# default_yes_yes_no__arr_empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('pass')] = $(['fail2'])] = ['', 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
{
  let ifTestTmp$1 = arrPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$1) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault$1;
  }
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
let ifTestTmp$1 = arrPatternBeforeDefault$1 === undefined;
if (ifTestTmp$1) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
