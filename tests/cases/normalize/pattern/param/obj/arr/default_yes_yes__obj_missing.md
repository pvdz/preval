# Preval test case

# default_yes_yes__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [] = $([`fail`]) } = tmpParamBare === undefined ? $({ x: [`fail2`] }) : tmpParamBare;
  return `ok`;
};
$(f({ a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = [`fail2`];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = [`fail`];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return `ok`;
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { a: 11, b: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = $ObjectPrototype.x;
let objPatternAfterDefault = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = [`fail`];
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "fail" ];
  b = $( d );
}
else {
  b = a;
}
[ ... b ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
