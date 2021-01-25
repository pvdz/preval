# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > ident > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('fail')] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
