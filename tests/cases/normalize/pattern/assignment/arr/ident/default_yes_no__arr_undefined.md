# Preval test case

# default_yes_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('pass')] = [undefined, 201]);
$(x);
`````

## Pre Normal


`````js filename=intro
[x = $(`pass`)] = [undefined, 201];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [undefined, 201];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Output


`````js filename=intro
x = $(`pass`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = $( "pass" );
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
