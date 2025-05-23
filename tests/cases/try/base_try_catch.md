# Preval test case

# base_try_catch.md

> Try > Base try catch
>
> Try base cases

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
}
$(3);
`````


## Settled


`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $(`fail`);
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $(`fail`);
}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
try {
  $( 2 );
}
catch (a) {
  $( "fail" );
}
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $(`fail`);
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
