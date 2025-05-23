# Preval test case

# ident.md

> Normalize > Member access > Statement > Func > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  $.length;
}
$(f());
`````


## Settled


`````js filename=intro
$.length;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$.length;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$.length;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $.length;
  return undefined;
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
