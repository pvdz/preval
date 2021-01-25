# Preval test case

# default_yes_no__arr_undefined.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['pass2'])] = [undefined, 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [undefined, 4, 5];
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
$('ok');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = [undefined, 4, 5];
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
[...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "ok"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
