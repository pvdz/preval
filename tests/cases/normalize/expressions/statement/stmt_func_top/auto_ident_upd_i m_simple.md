# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = { a: 999, b: 1000 };
  b--;
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 0);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, 0);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, 0 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
