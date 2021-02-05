# Preval test case

# default_yes_no_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') }] = []);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
