# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  new ($($))(1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
new tmpNewCallee(1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
new tmpNewCallee(1);
$({ a: 999, b: 1000 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
new a( 1 );
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
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = $($);
  new tmpNewCallee(1);
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
