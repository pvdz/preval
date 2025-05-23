# Preval test case

# default_yes_yes__0.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f(0, 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `pass` };
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpCalleeParam$5 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpOPAD, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.x;
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
const a = $Number_prototype.x;
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


- (todo) support array reads statement type VarStatement


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
