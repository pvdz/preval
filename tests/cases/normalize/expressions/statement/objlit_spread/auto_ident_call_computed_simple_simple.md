# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident call computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
({ ...b["$"](1) });
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpObjSpreadArg /*:unknown*/ = $dotCall($, b, `\$`, 1);
({ ...tmpObjSpreadArg });
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = $dotCall($, { $: $ }, `\$`, 1);
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
{ ... b };
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
const tmpMCF = b.$;
const tmpObjSpreadArg = $dotCall(tmpMCF, b, `\$`, 1);
({ ...tmpObjSpreadArg });
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
