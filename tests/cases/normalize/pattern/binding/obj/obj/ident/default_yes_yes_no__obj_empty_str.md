# Preval test case

# default_yes_yes_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: '', b: 11, c: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const { x: { y: y = $(`pass`) } = $({ y: `fail2` }) } = { x: ``, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: ``, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: `fail2` };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y = undefined;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault$1 = ``.y;
let y = undefined;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
