# Preval test case

# default_yes_no_no__123.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') }] = 1); // Expect to crash
$('bad');
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) }] = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = 1;
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
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ... 1 ];
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
