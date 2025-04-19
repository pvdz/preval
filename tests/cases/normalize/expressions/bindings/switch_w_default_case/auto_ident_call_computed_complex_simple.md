# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident call computed complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)["$"](1);
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(tmpClusterSSA_b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
$(tmpClusterSSA_a);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $({ $: $ });
$(tmpMCOO.$(1));
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
$( d );
$( "fail1" );
$( "fail2" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
