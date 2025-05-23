# Preval test case

# block.md

> Normalize > Hoisting > Func > Block
>
> Block hoisting func decls

At some point the block would be dropped but the function wouldn't be hoisted

## Input

`````js filename=intro
{
  f(); // Should be ok
  function f(){ $(1); } // this is let f = function(){}
}
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
