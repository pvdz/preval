# Preval test case

# caught_throw.md

> Try > Finally > Caught throw
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw 'testing'; // The finally should not trap this
  } catch {
    $('ok');
  }
} finally {
  $(2);
}
`````


## Settled


`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  try {
    $();
    throw "testing";
  }
  catch (a) {
    $( "ok" );
  }
}
catch (b) {
  $( 2 );
  throw b;
}
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 'ok'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
