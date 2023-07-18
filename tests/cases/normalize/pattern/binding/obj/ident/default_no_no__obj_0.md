# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: 0 };
$(x);
`````

## Pre Normal

`````js filename=intro
const { x: x } = { x: 0 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0 };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
