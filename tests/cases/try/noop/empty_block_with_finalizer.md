# Preval test case

# empty_block_with_finalizer.md

> Try > Noop > Empty block with finalizer
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
  } finally {
    $('pass');
  }
}
f();
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $(`pass`);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return undefined;
  }
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
