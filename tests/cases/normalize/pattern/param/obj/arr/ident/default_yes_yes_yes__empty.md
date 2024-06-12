# Preval test case

# default_yes_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) } = $({ x: ['pass3'] })) {
  return y;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = `fail`] = $([`fail2`]) } = tmpParamBare === undefined ? $({ x: [`pass3`] }) : tmpParamBare;
  return y;
};
$(f());
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
    const tmpObjLitVal = [`pass3`];
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
    const tmpCalleeParam$1 = [`fail2`];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
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
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpObjLitVal = [`pass3`];
const tmpCalleeParam = { x: tmpObjLitVal };
const tmpClusterSSA_bindingPatternObjRoot = $(tmpCalleeParam);
const objPatternBeforeDefault = tmpClusterSSA_bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = [`fail2`];
  objPatternAfterDefault = $(tmpCalleeParam$1);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$3 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(arrPatternBeforeDefault);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass3" ];
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = [ "fail2" ];
  e = $( g );
}
else {
  e = d;
}
const h = [ ... e ];
const i = h[ 0 ];
const j = i === undefined;
if (j) {
  $( "fail" );
}
else {
  $( i );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '["pass3"]' }
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
