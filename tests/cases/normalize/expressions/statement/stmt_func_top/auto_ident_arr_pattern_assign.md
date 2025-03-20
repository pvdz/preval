# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let x = 1,
    y = 2;

  let a = { a: 999, b: 1000 };
  [x, y] = [$(3), $(4)];
  $(a, x, y);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpArrElement, tmpArrElement$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$({ a: 999, b: 1000 }, tmpArrElement, tmpArrElement$1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
$( undefined );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
