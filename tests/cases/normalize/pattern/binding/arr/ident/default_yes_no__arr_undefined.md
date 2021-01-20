# Preval test case

# default_yes_no__arr_undefined.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('pass')] = [undefined, 201];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [undefined, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: Same

Final output calls: Same
