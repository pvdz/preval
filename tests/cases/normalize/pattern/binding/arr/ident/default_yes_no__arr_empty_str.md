# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Ident > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x = $('pass')] = ['', 201];
$(x);
`````

## Pre Normal


`````js filename=intro
const [x = $(`pass`)] = [``, 201];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [``, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x = undefined;
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
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
