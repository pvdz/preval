# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > ident > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = 0;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = objPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (0).x;
let x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: BAD?!
[['pass'], [{ 0: 'a', 1: 'b', 2: 'c' }], null];

Final output calls: Same
