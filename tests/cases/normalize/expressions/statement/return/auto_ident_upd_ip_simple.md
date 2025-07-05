# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Return > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return b++;
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 999, b: 1000 }, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
  return tmpPostUpdArgIdent;
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
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
