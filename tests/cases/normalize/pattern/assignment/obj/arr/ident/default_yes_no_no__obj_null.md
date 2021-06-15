# Preval test case

# default_yes_no_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { x: null, a: 11, b: 12 });
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: [y = `fail`],
} = { x: null, a: 11, b: 12 });
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: null, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `fail`;
} else {
  y = arrPatternBeforeDefault;
}
$(`bad`);
`````

## Output

`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
