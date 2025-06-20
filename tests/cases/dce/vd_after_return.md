# Preval test case

# vd_after_return.md

> Dce > Vd after return
>
> Func decl after return that is used

The DCE should not eliminate the var or the code will break. This one is simple, eh.

Note that technically the code could be optimized because it could realize that g is never initialized, so it becomes undefined, so it can be inlined. There may not be a test case possible for this one. Which may mean vars are almost irrelevant to scan for.

In fact, if a DCE'd var decl means it must be undefined, then inlining is the perfect solution for them.

## Input

`````js filename=intro
function f(x) {
  return g;
  var g = $();
}
$(f(1));
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  return undefined;
};
let tmpCalleeParam = f(1);
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
