# Preval test case

# default_no_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = {};
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: [y],
} = {};
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
