# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = 'abc';
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ ...x } = $({ a: `fail` })] = `abc`;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
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
const x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = [];
const x = objPatternRest(`a`, tmpCalleeParam$3, undefined);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
