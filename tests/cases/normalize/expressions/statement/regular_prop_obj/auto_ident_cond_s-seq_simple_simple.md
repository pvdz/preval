# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
((10, 20, 30) ? $(2) : $($(100))).a;
$(a);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(2);
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2).a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
a.a;
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
