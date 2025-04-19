# Preval test case

# default_yes_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'pass' }) } = { b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
let objPatternAfterDefault /*:unknown*/ = undefined;
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `pass` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$3 /*:array*/ = [];
y = $objPatternRest(objPatternAfterDefault, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let objPatternAfterDefault = undefined;
const objPatternBeforeDefault = $Object_prototype.x;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $({ a: `pass` });
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
y = $objPatternRest(objPatternAfterDefault, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = { a: "pass" };
  a = $( d );
}
else {
  a = b;
}
const e = [];
y = $objPatternRest( a, e, undefined );
$( y );
`````


## Todos triggered


None


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
