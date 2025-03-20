# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident prop c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, $(b)).c;
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(tmpClusterSSA_b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
$(tmpClusterSSA_a, tmpClusterSSA_b);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_b = { c: 1 };
$($(tmpClusterSSA_b).c, tmpClusterSSA_b);
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
