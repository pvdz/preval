# Preval test case

# try_hell_m.md

> Flow > Try finally throw early > Try hell m
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      break foo;
    } finally {
      throw_early
      return
    }
    // This is dead code regardless?
    $(x);
  }
  // Dead code because the finalizer return overrides the break
  x = 'fail';
}
f();
$(x);
`````


## Settled


`````js filename=intro
throw_early;
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 0 );
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
