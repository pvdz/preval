# Preval test case

# default_yes_yes_no__arr_undefined.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'pass2' })] = [undefined, 20, 30];
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x: x = $(`pass`) } = $({ x: `pass2` })] = [undefined, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: `pass2` };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { x: `pass2` };
const arrPatternStep = $(tmpCalleeParam);
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
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
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
