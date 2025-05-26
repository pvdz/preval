# Preval test case

# mutable_param_ident.md

> Function > Mutable param ident
>
> Param names can be written to

## Input

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a = $(10);
  return a;
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
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
