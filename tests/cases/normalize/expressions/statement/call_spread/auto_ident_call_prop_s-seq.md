# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Call spread > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(...(1, 2, b).$(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCalleeParamSpread /*:unknown*/ = $dotCall($, b, `\$`, 1);
$(...tmpCalleeParamSpread);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $dotCall($, { $: $ }, `\$`, 1);
$(...tmpCalleeParamSpread);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
$( ...b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCOO = b;
const tmpMCF = tmpMCOO.$;
let tmpCalleeParamSpread = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
$(...tmpCalleeParamSpread);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
