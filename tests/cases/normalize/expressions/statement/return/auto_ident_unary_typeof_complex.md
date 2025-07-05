# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Return > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return typeof $(arg);
}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpReturnArg /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
$(tmpReturnArg);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(typeof tmpUnaryArg);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(arg);
  const tmpReturnArg = typeof tmpUnaryArg;
  return tmpReturnArg;
};
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
