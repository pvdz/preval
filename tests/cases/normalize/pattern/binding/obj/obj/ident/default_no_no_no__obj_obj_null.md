# Preval test case

# default_no_no_no__obj_obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y } } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y },
} = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { x: 1, y: null, z: 3 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$(y);
`````

## Output


`````js filename=intro
$(null);
`````

## PST Output

With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
