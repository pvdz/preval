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
        $finalStep = true;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    throw_early;
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


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
