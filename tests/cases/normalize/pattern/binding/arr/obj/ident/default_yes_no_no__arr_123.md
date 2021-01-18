# Preval test case

# default_yes_no_no__arr_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = [1, 2, 3, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
{
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = objPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: BAD?!
[['pass'], [{ 0: 'a', 1: 'b', 2: 'c' }], null];

Final output calls: Same
