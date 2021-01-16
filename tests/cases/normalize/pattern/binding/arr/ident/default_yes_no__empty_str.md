# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > ident > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('pass')] = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
{
  let x;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''];
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
