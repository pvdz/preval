# Preval test case

# default_yes_no__obj_null.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = { x: null };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: null };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: null };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
