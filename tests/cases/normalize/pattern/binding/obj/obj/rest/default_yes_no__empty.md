# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = 1;
$('bad');
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
let tmpCalleeParam$1 /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `fail` };
  const tmpClusterSSA_objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
  tmpCalleeParam$1 = tmpClusterSSA_objPatternAfterDefault;
} else {
  tmpCalleeParam$1 = objPatternBeforeDefault;
}
const tmpCalleeParam$3 /*:array*/ = [];
objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x;
let tmpCalleeParam$1 = undefined;
if (objPatternBeforeDefault === undefined) {
  tmpCalleeParam$1 = $({ a: `fail` });
} else {
  tmpCalleeParam$1 = objPatternBeforeDefault;
}
objPatternRest(tmpCalleeParam$1, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const { x: { ...y } = $({ a: `fail` }) } = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: `fail` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "fail" };
  const e = $( d );
  b = e;
}
else {
  b = a;
}
const f = [];
objPatternRest( b, f, undefined );
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '"fail"' }
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
