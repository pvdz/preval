# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident prop s-seq assign simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = ((1, 2, b).c = 2);
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: 2 };
$(2, tmpClusterSSA_b);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, { c: 2 });
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 2 };
$( 2, a );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2, { c: '2' }
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
