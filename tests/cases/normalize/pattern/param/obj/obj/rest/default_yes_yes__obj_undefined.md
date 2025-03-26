# Preval test case

# default_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: `pass` };
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam$5 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(objPatternAfterDefault, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternAfterDefault = $({ a: `pass` });
$($objPatternRest(objPatternAfterDefault, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass" };
const b = $( a );
const c = [];
const d = $objPatternRest( b, c, undefined );
$( d );
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
