# Preval test case

# default_no_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = { x: 'abc', b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y },
} = { x: `abc`, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc`, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$(y);
`````

## Output


`````js filename=intro
const y /*:unknown*/ = `abc`.y;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "abc".y;
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
