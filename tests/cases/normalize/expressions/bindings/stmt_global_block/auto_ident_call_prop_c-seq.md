# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call prop c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = (1, 2, $(b)).$(1);
  $(a);
}
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $({ $: $ });
$(tmpMCOO.$(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
const tmpMCOO = $(b);
const tmpMCF = tmpMCOO.$;
let a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
$(a);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
