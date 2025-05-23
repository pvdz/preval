# Preval test case

# try_catch_finally.md

> Try > Finally > Try catch finally
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
} finally {
  $(3);
}
`````


## Settled


`````js filename=intro
try {
  $(1);
} catch (e) {
  try {
    $(2);
  } catch ($finalImplicit) {
    $(3);
    throw $finalImplicit;
  }
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch (e) {
  try {
    $(2);
  } catch ($finalImplicit) {
    $(3);
    throw $finalImplicit;
  }
}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {
  try {
    $( 2 );
  }
  catch (b) {
    $( 3 );
    throw b;
  }
}
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
} catch (e) {
  try {
    $(2);
  } catch ($finalImplicit) {
    $(3);
    throw $finalImplicit;
  }
}
$(3);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
