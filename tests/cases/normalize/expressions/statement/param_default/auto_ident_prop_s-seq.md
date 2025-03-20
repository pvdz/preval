# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Statement > Param default > Auto ident prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, b).c) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({ a: 999, b: 1000 }, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
