# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = null;
$('bad');
`````

## Pre Normal

`````js filename=intro
const [x] = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
[...null];
throw '[Preval]: Array spread must crash before this line';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
