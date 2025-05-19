# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic and or
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = ($($(1)) && $($(1))) || $($(2));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
  $(a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
if (a) {
  $(a);
  $(`fail1`);
  $(`fail2`);
} else {
  $($($(2)));
  $(`fail1`);
  $(`fail2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( b );
  $( "fail1" );
  $( "fail2" );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
