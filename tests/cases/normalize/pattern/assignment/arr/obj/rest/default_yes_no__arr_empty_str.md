# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x } = $({ a: 'fail' })] = ['', 20, 30]);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ ...x } = $({ a: `fail` })] = [``, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [``, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: `fail` };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = arrPatternStep;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$5 = undefined;
x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 = [];
x = objPatternRest(``, tmpCalleeParam$3, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( "", a, undefined );
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
