# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond c-seq c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpIfTest$5 /*:unknown*/ = $(30);
if (tmpIfTest$5) {
  const tmpClusterSSA_a /*:unknown*/ = $(60);
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_a$1);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  $($(60));
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
const a = $( 30 );
if (a) {
  const b = $( 60 );
  $( b );
  $( "fail1" );
  $( "fail2" );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( d );
  $( "fail1" );
  $( "fail2" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
