# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['fail2'])] = ['', 4, 5];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [[] = $(['fail2'])] = ['', 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail2'];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = ['fail2'];
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
[...arrPatternStep];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
