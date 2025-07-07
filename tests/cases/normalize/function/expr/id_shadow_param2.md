# Preval test case

# id_shadow_param2.md

> Normalize > Function > Expr > Id shadow param2
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(r) {
  $(typeof r, 'a');
  return r;
};
const x = f(10);
$(x, typeof f, 'b');
`````


## Settled


`````js filename=intro
$(`number`, `a`);
$(10, `function`, `b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`, `a`);
$(10, `function`, `b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number", "a" );
$( 10, "function", "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r$1 = function ($$0) {
  let r$2 = $$0;
  debugger;
  let tmpCalleeParam = typeof r$2;
  $(tmpCalleeParam, `a`);
  return r$2;
};
const f = r$1;
const x = r$1(10);
let tmpCalleeParam$1 = x;
let tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3, `b`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number', 'a'
 - 2: 10, 'function', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
