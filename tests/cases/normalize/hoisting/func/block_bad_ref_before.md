# Preval test case

# block_bad_ref_before.md

> Normalize > Hoisting > Func > Block bad ref before
>
> Block hoisting func decls

It shouldn't hoist the function outside the block.

## Input

`````js filename=intro
f(); // This ought to trigger TDZ (or whatever)...
{
  function f(){ $(1); }
}
`````


## Settled


`````js filename=intro
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
f();
`````


## PST Settled
With rename=true

`````js filename=intro
f();
`````


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
