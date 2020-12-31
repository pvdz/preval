# Preval test case

# default_yes_yes_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] = $(['fail2']) } = { x: [], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [], a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'pass' : arrPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [], a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'pass' : arrPatternBeforeDefault;
$(y);
`````
