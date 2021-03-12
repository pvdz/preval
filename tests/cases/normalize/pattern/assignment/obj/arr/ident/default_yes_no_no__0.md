# Preval test case

# default_yes_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = 0);
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: [y = 'fail'],
} = 0);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (0).x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
