# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x] = $('pass')] = 'abc');
$(x);
`````

## Pre Normal


`````js filename=intro
[[...x] = $(`pass`)] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
x = [`a`];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = [ "a" ];
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
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice