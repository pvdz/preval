# Preval test case

# default_yes_yes_yes__obj_obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return y;
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y: y = $(`pass`) } = $({ y: `fail2` }) } = tmpParamBare === undefined ? $({ x: { y: `fail3` } }) : tmpParamBare;
  return y;
};
$(f({ x: {}, b: 11, c: 12 }, 10));
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
    const tmpObjLitVal = { y: `fail3` };
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
    y = $(`pass`);
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpObjLitVal$1 = {};
const tmpCalleeParam$5 = { x: tmpObjLitVal$1, b: 11, c: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternBeforeDefault = tmpParamBare.x;
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
    const tmpClusterSSA_y = $(`pass`);
    return tmpClusterSSA_y;
  } else {
    return objPatternBeforeDefault$1;
  }
};
const tmpObjLitVal$1 = {};
const tmpCalleeParam$5 = { x: tmpObjLitVal$1, b: 11, c: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b.x;
  let e = undefined;
  const f = d === undefined;
  if (f) {
    const g = { y: "fail2" };
    e = $( g );
  }
  else {
    e = d;
  }
  const h = e.y;
  const i = h === undefined;
  if (i) {
    const j = $( "pass" );
    return j;
  }
  else {
    return h;
  }
};
const k = {};
const l = {
x: k,
b: 11,
c: 12
;
const m = a( l );
$( m );
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
