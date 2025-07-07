# Preval test case

# id_shadow_const.md

> Normalize > Function > Expr > Id shadow const
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  const r = 20; // Ignored. r is read-only but the write fails silently.
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````


## Settled


`````js filename=intro
$(`number`);
$(20, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(20, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 20, "function" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let r = function () {
  debugger;
  const r$1 = 20;
  let tmpCalleeParam = typeof r$1;
  $(tmpCalleeParam);
  return r$1;
};
const f = r;
const x = r();
let tmpCalleeParam$1 = x;
let tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 20, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
