# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = null;
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: [...y],
} = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
null.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
