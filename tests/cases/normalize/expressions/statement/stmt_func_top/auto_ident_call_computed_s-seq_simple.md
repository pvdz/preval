# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  (1, 2, b)["$"](1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
$dotCall($, b, `\$`, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($, { $: $ }, `\$`, 1);
$({ a: 999, b: 1000 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
$dotCall( $, a, "$", 1 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpMCOO = b;
  const tmpMCF = tmpMCOO.$;
  $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
