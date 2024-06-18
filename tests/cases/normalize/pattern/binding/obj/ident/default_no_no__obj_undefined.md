# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: undefined };
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: undefined };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined };
const x = bindingPatternObjRoot.x;
$(x);
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
