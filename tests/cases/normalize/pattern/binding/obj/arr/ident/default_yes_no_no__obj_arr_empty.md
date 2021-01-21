# Preval test case

# default_yes_no_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] } = { x: [], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [], a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
}
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [], a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
