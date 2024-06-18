# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: 'abc' };
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: `abc` };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc` };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output


`````js filename=intro
$(`abc`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
