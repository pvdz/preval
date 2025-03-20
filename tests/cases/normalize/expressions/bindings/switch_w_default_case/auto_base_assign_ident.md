# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Bindings > Switch w default case > Auto base assign ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = (b = $(2));
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a, a );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
