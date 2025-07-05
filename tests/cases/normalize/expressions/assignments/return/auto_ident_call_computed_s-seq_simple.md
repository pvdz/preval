# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident call computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b)["$"](1));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:object*/ /*truthy*/ = { $: $ };
const tmpClusterSSA_a /*:unknown*/ = $dotCall($, tmpMCOO, `\$`, 1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $dotCall($, { $: $ }, `\$`, 1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
$( b );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = b;
  const tmpMCF = tmpMCOO.$;
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  return a;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


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
