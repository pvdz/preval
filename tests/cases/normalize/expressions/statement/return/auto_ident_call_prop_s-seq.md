# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Return > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (1, 2, b).$(1);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:object*/ /*truthy*/ = { $: $ };
const tmpReturnArg /*:unknown*/ = $dotCall($, tmpMCOO, `\$`, 1);
$(tmpReturnArg);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($, { $: $ }, `\$`, 1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = b;
  const tmpMCF = tmpMCOO.$;
  const tmpReturnArg = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  return tmpReturnArg;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
