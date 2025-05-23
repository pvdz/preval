# Preval test case

# try_hell_l.md

> Flow > Try finally throw early > Try hell l
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
      x = 1;
      break foo;
    } finally {
      throw_early
      x = 2;
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
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        x = 1;
        $finalStep = true;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    throw_early;
    x = 2;
    return undefined;
  }
  x = `fail`;
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) i need trapChain for this to work properly


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
