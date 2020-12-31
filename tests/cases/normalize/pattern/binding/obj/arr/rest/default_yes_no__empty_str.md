# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['pass']) } = '';
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '',
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['pass']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = ''.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['pass']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  y = arrPatternSplat.slice(0);
$(y);
`````
