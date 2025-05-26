# Preval test case

# try_hell_n.md

> Flow > Try finally throw early > Try hell n
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
      throw 'not me';
    } finally {
      throw_early
      return
    }
  }
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
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      $finalArg = `not me`;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  throw_early;
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
