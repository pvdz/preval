# Preval test case

# default_yes_no_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') }] = '');
$('bad');
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) }] = ``;
$(`bad`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = ``;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(`bad`);
`````

## Output


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
