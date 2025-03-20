# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($)(1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
tmpCallComplexCallee(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
tmpCallComplexCallee(1);
$({ a: 999, b: 1000 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
a( 1 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
$( undefined );
`````


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
