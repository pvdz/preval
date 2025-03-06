# Preval test case

# default_yes_yes_yes__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f({ a: 11, b: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = `fail`] = $([`pass2`]) } = tmpParamBare === undefined ? $({ x: [`fail3`] }) : tmpParamBare;
  return y;
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
    const tmpObjLitVal = [`fail3`];
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = [`pass2`];
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$3 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$3) {
    y = `fail`;
    return y;
  } else {
    y = arrPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$5 = { a: 11, b: 12 };
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`pass2`];
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat /*:array*/ = [...objPatternAfterDefault];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest$3 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(arrPatternBeforeDefault);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass2" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
const f = e[ 0 ];
const g = f === undefined;
if (g) {
  $( "fail" );
}
else {
  $( f );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope