# Preval test case

# block_var_let.md

> Normalize > Dupe binds > Block var let
>
> Func params can be shadowed by let 

Note that the outer `return` is dead code and so it's eliminated.

## Input

`````js filename=intro
function f(x) {
  {
    let x = $(1);
    return x;
  }
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const x$1 /*:unknown*/ = $(1);
$(x$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let x$1 = $(1);
  return x$1;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
