# Preval test case

# block_bad_ref_after.md

> Normalize > Hoisting > Func > Block bad ref after
>
> Block hoisting func decls

In strict mode the funcdecl is a hoisted lexical binding, not a var binding.

## Input

`````js filename=intro
{
  function f(){ $(1); } // this is let f = function(){}
}
f(); // Fails in strict mode (would be fine otherwise)
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
