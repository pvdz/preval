# Preval test case

# default_yes_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Arr > Default yes no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[] = $(['pass2'])] = [, , , , 4, 5];
$('ok');
`````

## Pre Normal


`````js filename=intro
const [[] = $([`pass2`])] = [, , , , 4, 5];
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [, , , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`pass2`];
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
$(`ok`);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
[...arrPatternStep];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope