# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: null };
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: null };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: null };
const x = bindingPatternObjRoot.x;
$(x);
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
