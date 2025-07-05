# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b--);
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
$(1, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  a = tmpPostUpdArgIdent;
  return a;
};
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
