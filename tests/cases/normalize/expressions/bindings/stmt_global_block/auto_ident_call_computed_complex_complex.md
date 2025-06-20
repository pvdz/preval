# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = $(b)[$("$")](1);
  $(a);
}
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $({ $: $ });
const tmpMCCP = $(`\$`);
$(tmpMCCO[tmpMCCP](1));
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
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
let a = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
$(a);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
