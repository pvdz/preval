# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident call computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b)["$"](1);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($, { $: $ }, `\$`, 1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
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
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
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
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
