# Preval test case

# default_yes_no_no__null.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
}
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = null.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
