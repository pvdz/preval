# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'pass3' } })) {
  return y;
}
$(f(undefined, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y: y = $(`fail`) } = $({ y: `fail2` }) } = tmpParamBare === undefined ? $({ x: { y: `pass3` } }) : tmpParamBare;
  return y;
};
$(f(undefined, 10));
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
    const tmpObjLitVal = { y: `pass3` };
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
    const tmpCalleeParam$1 = { y: `fail2` };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$3 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    y = $(`fail`);
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, 10);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal = { y: `pass3` };
  const tmpCalleeParam = { x: tmpObjLitVal };
  const tmpClusterSSA_bindingPatternObjRoot = $(tmpCalleeParam);
  const objPatternBeforeDefault = tmpClusterSSA_bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { y: `fail2` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  const tmpIfTest$3 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$3) {
    const tmpClusterSSA_y = $(`fail`);
    return tmpClusterSSA_y;
  } else {
    return objPatternBeforeDefault$1;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = { y: "pass3" };
  const c = { x: b };
  const d = $( c );
  const e = d.x;
  let f = undefined;
  const g = e === undefined;
  if (g) {
    const h = { y: "fail2" };
    f = $( h );
  }
  else {
    f = e;
  }
  const i = f.y;
  const j = i === undefined;
  if (j) {
    const k = $( "fail" );
    return k;
  }
  else {
    return i;
  }
};
const l = a();
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"\\"pass3\\""}' }
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
