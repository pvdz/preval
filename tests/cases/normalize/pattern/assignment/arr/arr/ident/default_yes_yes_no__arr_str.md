# Preval test case

# default_yes_yes_no__arr_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default yes yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x = $('fail')] = $(['fail2'])] = ['abc', 4, 5]);
$(x);
`````

## Pre Normal


`````js filename=intro
[[x = $(`fail`)] = $([`fail2`])] = [`abc`, 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [`abc`, 4, 5];
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
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output


`````js filename=intro
x = `a`;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = "a";
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope