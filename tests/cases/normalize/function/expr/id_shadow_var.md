# Preval test case

# id_shadow_var.md

> Normalize > Function > Expr > Id shadow var
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  var r = 20; // Ignored. r is read-only but the write fails silently.
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
const r$1 = function () {
  debugger;
  let r$2 = undefined;
  r$2 = 20;
  let tmpCalleeParam = typeof r$2;
  $(tmpCalleeParam);
  return r$2;
};
const f = r$1;
const x = r$1();
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
