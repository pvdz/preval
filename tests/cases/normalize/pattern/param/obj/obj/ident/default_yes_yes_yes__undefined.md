# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'pass3' } })) {
  return y;
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: `pass3` };
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
const tmpClusterSSA_tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpClusterSSA_tmpBindingPatternObjRoot.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { y: `fail2` };
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 /*:unknown*/ = tmpOPAD.y;
const tmpIfTest$3 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$3) {
  const tmpClusterSSA_y /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_y);
} else {
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { y: `pass3` };
const tmpOPBD = $({ x: tmpObjLitVal }).x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ y: `fail2` });
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 = tmpOPAD.y;
if (tmpOPBD$1 === undefined) {
  $($(`fail`));
} else {
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: "pass3" };
const b = { x: a };
const c = $( b );
const d = c.x;
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
  const j = $( "fail" );
  $( j );
}
else {
  $( h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { y: `pass3` };
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { y: `fail2` };
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpOPBD$1 = tmpOPAD.y;
  let y = undefined;
  const tmpIfTest$3 = tmpOPBD$1 === undefined;
  if (tmpIfTest$3) {
    y = $(`fail`);
    return y;
  } else {
    y = tmpOPBD$1;
    return y;
  }
};
let tmpCalleeParam$3 = f(undefined, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"\\"pass3\\""}' }
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
