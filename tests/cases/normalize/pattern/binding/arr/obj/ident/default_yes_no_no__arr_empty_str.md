# Preval test case

# default_yes_no_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = ['', 20, 30];
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x: x = $(`pass`) }] = [``, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [``, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = ``.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
