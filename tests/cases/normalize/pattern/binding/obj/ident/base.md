# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
