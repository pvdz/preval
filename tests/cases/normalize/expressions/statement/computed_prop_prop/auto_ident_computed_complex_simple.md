# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[$(b)["c"]];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = tmpCompObj$1.c;
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompProp = $(b).c;
({}[tmpCompProp]);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = {};
d[ c ];
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
