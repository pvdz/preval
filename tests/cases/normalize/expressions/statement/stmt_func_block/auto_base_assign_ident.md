# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Stmt func block > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = { a: 999, b: 1000 };
    b = $(2);
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
$({ a: 999, b: 1000 }, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
