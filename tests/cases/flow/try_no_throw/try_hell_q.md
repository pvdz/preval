# Preval test case

# try_hell_q.md

> Flow > Try no throw > Try hell q
>
> Bunch of try/catch/finally cases0

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    x = 1;
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
considerMutated(x) // always true (!)
`````


## Settled


`````js filename=intro
considerMutated(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(1);
`````


## PST Settled
With rename=true

`````js filename=intro
considerMutated( 1 );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
