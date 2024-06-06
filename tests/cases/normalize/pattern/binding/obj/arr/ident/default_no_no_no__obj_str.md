# Preval test case

# default_no_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: 'abc', a: 11, b: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: [y],
} = { x: `abc`, a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc`, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Output


`````js filename=intro
$(`a`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "a" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
