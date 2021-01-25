# Preval test case

# default_yes_no_no__empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '';
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y;
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
const objPatternNoDefault = ''.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y;
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
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
