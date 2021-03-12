# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = undefined;
$('bad');
`````

## Pre Normal

`````js filename=intro
const { x } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
const x = bindingPatternObjRoot.x;
$('bad');
`````

## Output

`````js filename=intro
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
