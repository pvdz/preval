# Preval test case

# default_no_no_no__undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = undefined;
$('bad');
`````

## Pre Normal


`````js filename=intro
const {
  x: [y],
} = undefined;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = undefined;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
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
