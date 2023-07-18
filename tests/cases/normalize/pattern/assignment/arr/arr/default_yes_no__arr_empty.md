# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Arr > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[] = $(['pass2'])] = []);
$('ok');
`````

## Pre Normal

`````js filename=intro
[[] = $([`pass2`])] = [];
$(`ok`);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`pass2`];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
$(`ok`);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`pass2`];
const arrPatternStep = $(tmpCalleeParam);
[...arrPatternStep];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2",, ];
const b = $( a );
[ ... b,, ];
$( "ok" );
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
