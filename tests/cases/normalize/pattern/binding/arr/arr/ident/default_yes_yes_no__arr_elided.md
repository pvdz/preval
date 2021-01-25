# Preval test case

# default_yes_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['pass2'])] = [, , , , 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [, , , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['pass2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [, , , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['pass2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
