# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: { ...y },
} = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(y);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
x: 1,
y: 2,
z: 3
;
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
