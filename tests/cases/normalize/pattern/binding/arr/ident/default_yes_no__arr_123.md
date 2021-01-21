# Preval test case

# default_yes_no__arr_123.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('fail')] = [1, 2, 3];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
