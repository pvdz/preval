# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident object empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
({}.a);
$(a);
`````


## Settled


`````js filename=intro
$Object_prototype.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$Object_prototype.a;
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
