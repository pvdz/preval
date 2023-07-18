# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = 'abc';
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x: x }] = `abc`;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
const x = `a`.x;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "a".x;
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
