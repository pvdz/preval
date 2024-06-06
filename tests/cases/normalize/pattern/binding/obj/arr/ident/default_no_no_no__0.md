# Preval test case

# default_no_no_no__0.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = 0;
$('bad');
`````

## Pre Normal


`````js filename=intro
const {
  x: [y],
} = 0;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(`bad`);
`````

## Output


`````js filename=intro
const objPatternNoDefault = (0).x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
const b = [ ... a ];
b[ 0 ];
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
