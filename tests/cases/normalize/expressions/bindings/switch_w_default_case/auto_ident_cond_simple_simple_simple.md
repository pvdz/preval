# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond simple simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? 2 : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
