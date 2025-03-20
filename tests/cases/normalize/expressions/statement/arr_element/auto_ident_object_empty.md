# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Statement > Arr element > Auto ident object empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({} + {});
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:object*/ = {};
const tmpBinBothRhs /*:object*/ = {};
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({} + {});
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {};
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
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
