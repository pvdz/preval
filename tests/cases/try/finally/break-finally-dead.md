# Preval test case

# break-finally-dead.md

> Try > Finally > Break-finally-dead
> The try/finally always breaks or throws so subsequent statements are never visited
> The try node should handle that generically, just like the if-else (and infinite loops, later)

## Input

`````js filename=intro
{
  here: {
    try {
      $(1);
      break here;
    } finally {
      $(2);
    }

    // Dead code (we could detect this)
    $('remove me'); // not relevant to the ref test
  }
  
  $(3);
}
`````


## Settled


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {
  $( 2 );
  throw a;
}
$( 2 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
here: {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      $finalStep = true;
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
    break here;
  }
}
$(3);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
