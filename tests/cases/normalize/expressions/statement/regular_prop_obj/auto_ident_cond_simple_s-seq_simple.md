# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident cond simple s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 ? (40, 50, 60) : $($(100))).a;
$(a);
`````


## Settled


`````js filename=intro
(60).a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(60).a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
(60).a;
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Todos triggered


None


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
