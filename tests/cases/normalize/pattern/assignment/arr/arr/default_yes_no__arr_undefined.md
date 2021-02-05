# Preval test case

# default_yes_no__arr_undefined.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[] = $(['pass2'])] = [undefined, 4, 5]);
$('ok');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [undefined, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['pass2'];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [undefined, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['pass2'];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
[...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
