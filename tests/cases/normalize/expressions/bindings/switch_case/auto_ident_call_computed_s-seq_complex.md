# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = (1, 2, b)[$("$")](1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpClusterSSA_b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = tmpClusterSSA_b[tmpMCCP];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpClusterSSA_b, undefined, 1);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const tmpClusterSSA_b = { $: $ };
$(tmpClusterSSA_b[tmpMCCP](1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
