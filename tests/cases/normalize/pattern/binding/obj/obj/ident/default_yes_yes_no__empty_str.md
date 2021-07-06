# Preval test case

# default_yes_yes_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = '';
$(y);
`````

## Pre Normal

`````js filename=intro
const { x: { y: y = $(`fail`) } = $({ y: `pass2` }) } = ``;
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = ``;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: `pass2` };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y = undefined;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = ``.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `pass2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_y = $(`fail`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
