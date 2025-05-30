# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic and and
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(1)) && $($(1)) && $($(2));
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
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$1);
    $(`fail1`);
    $(`fail2`);
  } else {
    $(tmpClusterSSA_a);
    $(`fail1`);
    $(`fail2`);
  }
} else {
  $(a);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $($($(2)));
    $(`fail1`);
    $(`fail2`);
  } else {
    $(tmpClusterSSA_a);
    $(`fail1`);
    $(`fail2`);
  }
} else {
  $(a);
  $(`fail1`);
  $(`fail2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( d );
    $( "fail1" );
    $( "fail2" );
  }
}
else {
  $( b );
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
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 'fail1'
 - 9: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
