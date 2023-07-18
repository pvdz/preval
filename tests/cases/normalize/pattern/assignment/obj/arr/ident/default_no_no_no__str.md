# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = 'abc');
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: [y],
} = `abc`);
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = `abc`;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = `abc`.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "abc".x;
const b = [ ... a,, ];
y = b[ 0 ];
$( "bad" );
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
