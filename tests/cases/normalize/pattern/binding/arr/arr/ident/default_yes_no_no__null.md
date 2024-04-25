# Preval test case

# default_yes_no_no__null.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')]] = null;
$('bad');
`````

## Pre Normal

`````js filename=intro
const [[x = $(`fail`)]] = null;
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
} else {
  x = arrPatternBeforeDefault;
}
$(`bad`);
`````

## Output

`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ... null ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
