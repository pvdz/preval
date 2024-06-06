# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Obj > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{}] = 'abc');
$('bad');
`````

## Pre Normal


`````js filename=intro
[{}] = `abc`;
$(`bad`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## Output


`````js filename=intro
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
