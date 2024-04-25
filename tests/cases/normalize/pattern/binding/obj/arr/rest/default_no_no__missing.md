# Preval test case

# default_no_no__missing.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = { a: 11, b: 12 };
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: [...y],
} = { a: 11, b: 12 };
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = $ObjectPrototype.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
const b = [ ... a ];
b.slice( 0 );
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
