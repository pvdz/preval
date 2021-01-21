# Preval test case

# default_yes_no_no__obj_0.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: 0, a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0, a: 11, b: 12 };
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
const bindingPatternObjRoot = { x: 0, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
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
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

