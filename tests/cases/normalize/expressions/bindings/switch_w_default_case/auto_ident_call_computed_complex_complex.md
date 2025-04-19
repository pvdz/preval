# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident call computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)[$("$")](1);
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
const tmpMCCO /*:unknown*/ = $(tmpClusterSSA_b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
$(tmpClusterSSA_a);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $({ $: $ });
const tmpMCCP = $(`\$`);
$(tmpMCCO[tmpMCCP](1));
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
$( e );
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
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
