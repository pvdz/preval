# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = null;
$('bad');
`````

## Pre Normal


`````js filename=intro
const { x: x } = null;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = null;
const x = bindingPatternObjRoot.x;
$(`bad`);
`````

## Output


`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.x;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
