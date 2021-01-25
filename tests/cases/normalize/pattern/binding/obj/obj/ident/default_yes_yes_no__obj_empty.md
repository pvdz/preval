# Preval test case

# default_yes_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = {};
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { y: 'pass2' };
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
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { y: 'pass2' };
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
$(y);
`````

## Result

Should call `$` with:
 - 0: {"y":"pass2"}
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
