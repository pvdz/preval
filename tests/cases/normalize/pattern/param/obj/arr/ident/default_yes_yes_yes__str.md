# Preval test case

# default_yes_yes_yes__str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f('abc', 10));
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = `abc`.x;
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = `abc`.x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $([`pass2`]);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternBeforeDefault = [...objPatternAfterDefault][0];
if (arrPatternBeforeDefault === undefined) {
  $(`fail`);
} else {
  $(arrPatternBeforeDefault);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
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


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
