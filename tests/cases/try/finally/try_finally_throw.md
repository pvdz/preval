# Preval test case

# try_finally_throw.md

> Try > Finally > Try finally throw
>
> Finally transform checks

## Input

`````js filename=intro
try {
  throw 'exit';
} finally {
  $(2);
}
`````


## Settled


`````js filename=intro
$(2);
throw `exit`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
throw `exit`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
throw "exit";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow = false;
let $finalStep = false;
let $finalCatchArg = undefined;
let $finalArg = undefined;
$finally: {
  try {
    $finalStep = true;
    $finalArg = `exit`;
    break $finally;
  } catch ($finalImplicit) {
    $(2);
    throw $finalImplicit;
  }
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  throw $finalArg;
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ exit ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
