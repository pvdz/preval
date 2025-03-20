# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond simple c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? (40, 50, $(60)) : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(60);
$(tmpClusterSSA_a);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(60));
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
$( a );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
