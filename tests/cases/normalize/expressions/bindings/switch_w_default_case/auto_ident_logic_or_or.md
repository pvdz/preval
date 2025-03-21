# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic or or
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || $($(1)) || $($(2));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    $(tmpClusterSSA_a$1);
    $(`fail1`);
    $(`fail2`);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$3);
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    $(tmpClusterSSA_a$1);
    $(`fail1`);
    $(`fail2`);
  } else {
    $($($(2)));
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( "fail1" );
  $( "fail2" );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $( d );
    $( "fail1" );
    $( "fail2" );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( "fail1" );
    $( "fail2" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
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
