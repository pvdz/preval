# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'pass' }) } = 0);
$(y);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (0).x;
let tmpCalleeParam$1 /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `pass` };
  const tmpClusterSSA_objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
  tmpCalleeParam$1 = tmpClusterSSA_objPatternAfterDefault;
} else {
  tmpCalleeParam$1 = objPatternBeforeDefault;
}
const tmpCalleeParam$3 /*:array*/ = [];
y = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (0).x;
let tmpCalleeParam$1 = undefined;
if (objPatternBeforeDefault === undefined) {
  tmpCalleeParam$1 = $({ a: `pass` });
} else {
  tmpCalleeParam$1 = objPatternBeforeDefault;
}
y = $objPatternRest(tmpCalleeParam$1, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
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
y = $objPatternRest( b, f, undefined );
$( y );
`````


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
