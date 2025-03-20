# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(b?.["x"])["a"];
$(a);
`````


## Settled


`````js filename=intro
(1).a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
1.a;
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
