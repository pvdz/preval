# Preval test case

# default_yes_no__obj_123.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('fail');
    } else {
      x = objPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
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
[[1], null];

Normalized calls: BAD?!
[[{ 0: 'a', 1: 'b', 2: 'c' }], null];

Final output calls: Same
