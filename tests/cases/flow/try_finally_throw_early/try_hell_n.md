# Preval test case

# try_hell_n.md

> Flow > Try finally throw early > Try hell n
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      throw 'not me';
    } finally {
      throw_early
      return
    }
  }
}
f();
considerMutated(x) // always false
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
