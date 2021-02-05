# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = undefined.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
