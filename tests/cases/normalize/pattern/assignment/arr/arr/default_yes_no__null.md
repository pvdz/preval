# Preval test case

# default_yes_no__null.md

> Normalize > Pattern > Assignment > Arr > Arr > Default yes no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[] = $(['fail2'])] = null);
$('bad');
`````

## Pre Normal


`````js filename=intro
[[] = $([`fail2`])] = null;
$(`bad`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = null;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail2`];
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
$(`bad`);
`````

## Output


`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ...null ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope