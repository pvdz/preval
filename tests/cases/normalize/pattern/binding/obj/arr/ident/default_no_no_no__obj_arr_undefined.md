# Preval test case

# default_no_no_no__obj_arr_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: [undefined], a: 11, b: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: [y],
} = { x: [undefined], a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [undefined];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
