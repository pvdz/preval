# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Return > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
function f() {
  return (b = 2);
}
$(f());
$(a, b, c);
`````


## Settled


`````js filename=intro
$(2);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$({ a: 999, b: 1000 }, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  b = 2;
  return b;
};
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
