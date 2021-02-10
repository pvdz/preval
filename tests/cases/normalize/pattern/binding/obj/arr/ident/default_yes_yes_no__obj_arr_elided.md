# Preval test case

# default_yes_yes_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] = $(['fail2']) } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail2'];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
