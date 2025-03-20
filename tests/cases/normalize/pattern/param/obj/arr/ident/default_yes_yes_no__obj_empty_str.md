# Preval test case

# default_yes_yes_no__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'pass'] = $(['fail2']) }) {
  return y;
}
$(f({ x: '', a: 11, b: 12 }, 10));
`````

## Settled


`````js filename=intro
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = `pass`] = $([`fail2`]) } = tmpParamBare;
  return y;
};
$(f({ x: ``, a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail2`];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = `pass`;
    return y;
  } else {
    y = arrPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = { x: ``, a: 11, b: 12 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
