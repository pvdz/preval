# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond complex simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? 2 : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpIfTest$5 /*:unknown*/ = $(1);
if (tmpIfTest$5) {
  $(2);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam);
  $(a);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
  $(`fail1`);
  $(`fail2`);
} else {
  $($($(100)));
  $(`fail1`);
  $(`fail2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
  $( "fail1" );
  $( "fail2" );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
  $( "fail1" );
  $( "fail2" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
