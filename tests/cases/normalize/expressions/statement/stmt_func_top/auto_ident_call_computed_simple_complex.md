# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  b[$("$")](1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
$dotCall(tmpMCF, b, undefined, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
b[tmpMCCP](1);
$({ a: 999, b: 1000 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
$dotCall( c, b, undefined, 1 );
const d = {
  a: 999,
  b: 1000,
};
$( d );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpMCCO = b;
  const tmpMCCP = $(`\$`);
  const tmpMCF = tmpMCCO[tmpMCCP];
  $dotCall(tmpMCF, tmpMCCO, undefined, 1);
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
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
