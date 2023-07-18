# Preval test case

# default_yes_no__arr_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x] = $('fail')] = ['abc', 4, 5]);
$(x);
`````

## Pre Normal

`````js filename=intro
[[...x] = $(`fail`)] = [`abc`, 4, 5];
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
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [`a`, `b`, `c`];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c",, ];
x = a.slice( 0 );
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
