# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > Let > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = new $(1);
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:object*/ /*truthy*/ = new $(1);
$(xyz);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = new $(1);
$(xyz);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
