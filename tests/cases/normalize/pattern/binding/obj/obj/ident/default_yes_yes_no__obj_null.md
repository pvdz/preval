# Preval test case

# default_yes_yes_no__obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: null, b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { y: 'fail2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault$1;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { y: 'fail2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault$1;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of null ]>

Normalized calls: Same

Final output calls: Same
