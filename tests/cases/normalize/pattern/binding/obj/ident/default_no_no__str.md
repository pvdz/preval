# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = 'abc';
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x } = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = `abc`;
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = `abc`.x;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "abc".x;
$( a );
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
