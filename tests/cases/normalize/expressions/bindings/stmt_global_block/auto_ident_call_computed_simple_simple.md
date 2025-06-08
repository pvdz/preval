# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = b["$"](1);
  $(a);
}
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($, { $: $ }, `\$`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
const tmpMCF = b.$;
let a = $dotCall(tmpMCF, b, `\$`, 1);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
