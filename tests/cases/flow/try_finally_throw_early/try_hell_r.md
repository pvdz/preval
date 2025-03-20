# Preval test case

# try_hell_r.md

> Flow > Try finally throw early > Try hell r
>
> Bunch of try/catch/finally cases0

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
    x = 2;
    throw 'two';
  } finally {
    throw_early
    break stop; // Overrides the throw in the catch
  }
}
f();
considerMutated(x) // always true (!)
`````


## Settled


`````js filename=intro
throw_early;
considerMutated(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
considerMutated(0);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
considerMutated( 0 );
`````


## Globals


BAD@! Found 2 implicit global bindings:

throw_early, considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
