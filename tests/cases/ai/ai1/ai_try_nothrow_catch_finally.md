# Preval test case

# ai_try_nothrow_catch_finally.md

> Ai > Ai1 > Ai try nothrow catch finally
>
> Test: try{stmt1_nothrow} catch{stmt2} finally{stmt3} -> stmt1; stmt3;

## Input

`````js filename=intro
// Expected: let x=0; x=1; $('in_finally'); $('after_all', x);
let x = 0;
try {
  x = 1; // This assignment is non-throwing
  $('in_try_should_run_if_no_throw'); // this makes it more complex due to $()
} catch (e) {
  $('in_catch_SHOULD_BE_REMOVED');
  x = 2;
} finally {
  $('in_finally');
  // x = 3; // Let's see how it handles assignment in finally too, after a non-throwing try
}
$('after_all', x);
`````


## Settled


`````js filename=intro
let tmpClusterSSA_x /*:number*/ /*truthy*/ = 1;
try {
  $(`in_try_should_run_if_no_throw`);
} catch (e) {
  try {
    $(`in_catch_SHOULD_BE_REMOVED`);
    tmpClusterSSA_x = 2;
  } catch ($finalImplicit) {
    $(`in_finally`);
    throw $finalImplicit;
  }
}
$(`in_finally`);
$(`after_all`, tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_x = 1;
try {
  $(`in_try_should_run_if_no_throw`);
} catch (e) {
  try {
    $(`in_catch_SHOULD_BE_REMOVED`);
    tmpClusterSSA_x = 2;
  } catch ($finalImplicit) {
    $(`in_finally`);
    throw $finalImplicit;
  }
}
$(`in_finally`);
$(`after_all`, tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
try {
  $( "in_try_should_run_if_no_throw" );
}
catch (b) {
  try {
    $( "in_catch_SHOULD_BE_REMOVED" );
    a = 2;
  }
  catch (c) {
    $( "in_finally" );
    throw c;
  }
}
$( "in_finally" );
$( "after_all", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  x = 1;
  $(`in_try_should_run_if_no_throw`);
} catch (e) {
  try {
    $(`in_catch_SHOULD_BE_REMOVED`);
    x = 2;
  } catch ($finalImplicit) {
    $(`in_finally`);
    throw $finalImplicit;
  }
}
$(`in_finally`);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(`after_all`, x);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'in_try_should_run_if_no_throw'
 - 2: 'in_finally'
 - 3: 'after_all', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
