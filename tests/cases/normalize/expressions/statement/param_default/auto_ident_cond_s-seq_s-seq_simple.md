# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident cond s-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (10, 20, 30) ? (40, 50, 60) : $($(100))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
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
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
