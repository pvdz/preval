# Preval test case

# param_is_catch_var.md

> Static arg ops > Assignment > Param is catch var

## Input

`````js filename=intro
try {
  $(1);
  throw 'foo';
} catch (err) {
  function f(b) {
    b = err;
    $(err, b);
  };

  f(11);
  f(12);
  $(err);
}
$(3);
`````


## Settled


`````js filename=intro
try {
  $(1);
  throw `foo`;
} catch (err) {
  $(err, err);
  $(err, err);
  $(err);
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  throw `foo`;
} catch (err) {
  $(err, err);
  $(err, err);
  $(err);
}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  throw "foo";
}
catch (a) {
  $( a, a );
  $( a, a );
  $( a );
}
$( 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'foo', 'foo'
 - 3: 'foo', 'foo'
 - 4: 'foo'
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
