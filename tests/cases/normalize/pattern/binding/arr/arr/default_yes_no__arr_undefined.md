# Preval test case

# default_yes_no__arr_undefined.md

> Normalize > Pattern > Binding > Arr > Arr > Default yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['pass2'])] = [undefined, 4, 5];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [[] = $(['pass2'])] = [undefined, 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
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
$('ok');
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['pass2'];
const arrPatternStep = $(tmpCalleeParam);
[...arrPatternStep];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
