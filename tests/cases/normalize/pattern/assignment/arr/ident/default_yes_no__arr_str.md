# Preval test case

# default_yes_no__arr_str.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('pass')] = ['abc', 201]);
$(x);
`````

## Pre Normal


`````js filename=intro
[x = $(`pass`)] = [`abc`, 201];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [`abc`, 201];
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
x = `abc`;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = "abc";
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
