# Preval test case

# default_yes_yes__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({}, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: `pass` }) } = tmpParamBare === undefined ? $({ x: { a: `fail2` } }) : tmpParamBare;
  return y;
};
$(f({}, 10));
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
    const tmpObjLitVal = { a: `fail2` };
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
    const tmpCalleeParam$1 = { a: `pass` };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$3 = objPatternRest;
  const tmpCalleeParam$3 = objPatternAfterDefault;
  const tmpCalleeParam$5 = [];
  const tmpCalleeParam$7 = undefined;
  let y = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  return y;
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpCalleeParam$11 = {};
const tmpCalleeParam$13 = 10;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
let tmpCalleeParam$3 /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `pass` };
  const tmpClusterSSA_objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam$1);
  tmpCalleeParam$3 = tmpClusterSSA_objPatternAfterDefault;
} else {
  tmpCalleeParam$3 = objPatternBeforeDefault;
}
const tmpCalleeParam$5 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "pass" };
  const e = $( d );
  b = e;
}
else {
  b = a;
}
const f = [];
const g = objPatternRest( b, f, undefined );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
