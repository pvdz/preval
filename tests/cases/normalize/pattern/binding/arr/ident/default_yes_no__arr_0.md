# Preval test case

# default_yes_no__arr_0.md

> Normalize > Pattern > Binding > Arr > Ident > Default yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('pass')] = [0, 201];
$(x);
`````

## Pre Normal

`````js filename=intro
const [x = $('pass')] = [0, 201];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [0, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [0, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
