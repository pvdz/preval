# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Objlit init > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
({ x: delete ($(1), $(2), $(arg)).y });
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
delete tmpDeleteObj.y;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
delete b.y;
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
