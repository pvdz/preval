# Preval test case

# decl_after_closured.md

> Normalize > Dce > Return > Decl after closured
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

## Input

`````js filename=intro
function g() {
  function f() {
    // Note: calling f() will always crash with TDZ error but not before.
    $(x);
  }
  return f;
  // The point is that x is still referencable by f() so this line should be not DCE'd
  let x = $(1);
}
g()();
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: 0
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 0
 - eval returned: undefined
