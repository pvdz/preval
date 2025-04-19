# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = 'abc';
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `pass` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpCalleeParam$3 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpOPAD, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ a: `pass` });
} else {
  tmpOPAD = tmpOPBD;
}
$($objPatternRest(tmpOPAD, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "pass" };
  b = $( d );
}
else {
  b = a;
}
const e = [];
const f = $objPatternRest( b, e, undefined );
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
