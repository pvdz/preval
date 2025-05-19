# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic or complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || 2;
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
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(a);
  $(`fail1`);
  $(`fail2`);
} else {
  $(2);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(a);
  $(`fail1`);
  $(`fail2`);
} else {
  $(2);
  $(`fail1`);
  $(`fail2`);
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
  $( 2 );
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
