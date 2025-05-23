# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident call prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = b.$(1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($dotCall($, { $: $ }, `\$`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpMCF = b.$;
a = $dotCall(tmpMCF, b, `\$`, 1);
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
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
