# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)[$("$")](1);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpReturnArg /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
$(tmpReturnArg);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $({ $: $ });
const tmpMCCP = $(`\$`);
$(tmpMCCO[tmpMCCP](1));
$({ a: 999, b: 1000 });
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
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCCO = $(b);
  const tmpMCCP = $(`\$`);
  const tmpMCF = tmpMCCO[tmpMCCP];
  const tmpReturnArg = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  return tmpReturnArg;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
