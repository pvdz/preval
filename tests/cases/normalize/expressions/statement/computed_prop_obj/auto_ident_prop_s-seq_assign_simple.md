# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
((1, 2, b).c = 2)["a"];
$(a, b);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const b /*:object*/ /*truthy*/ = { c: 2 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$({ a: 999, b: 1000 }, { c: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 2 };
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpInitAssignLhsComputedObj = b;
const tmpInitAssignLhsComputedRhs = 2;
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
const tmpCompObj = tmpInitAssignLhsComputedRhs;
tmpCompObj.a;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
