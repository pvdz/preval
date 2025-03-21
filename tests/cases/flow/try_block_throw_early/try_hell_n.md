# Preval test case

# try_hell_n.md

> Flow > Try block throw early > Try hell n
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      fail_early
      throw 'not me';
    } finally {
      return
    }
  }
}
f();
considerMutated(x) // always false
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
considerMutated(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
considerMutated(0);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {

}
considerMutated( 0 );
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

fail_early, considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
