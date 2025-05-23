# Preval test case

# pattern.md

> Primitive arg inlining > Pattern
>
> This is roughly what patterns dissolve into

## Input

`````js filename=intro
function f(op) {
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
}
const out = f('abc');
$(out);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$2 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(`abc`, tmpCalleeParam$2, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(objPatternRest(`abc`, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( "abc", a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let op = $$0;
  debugger;
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: `fail` };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
};
const out = f(`abc`);
$(out);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

objPatternRest


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
