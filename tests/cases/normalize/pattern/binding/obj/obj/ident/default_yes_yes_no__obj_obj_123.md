# Preval test case

# default_yes_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: 'fail2' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y = undefined;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
