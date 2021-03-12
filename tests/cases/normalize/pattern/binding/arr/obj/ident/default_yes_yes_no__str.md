# Preval test case

# default_yes_yes_no__str.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = 'abc';
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 'fail2' };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = ['a', 'b', 'c'];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { x: 'fail2' };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('pass');
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
