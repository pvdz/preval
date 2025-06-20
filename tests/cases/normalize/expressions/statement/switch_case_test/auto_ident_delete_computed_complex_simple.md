# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case delete $(arg)["y"]:
}
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
delete tmpDeleteObj.y;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { y: 1 };
const b = $( a );
delete b.y;
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpDeleteObj = $(arg);
const tmpBinBothRhs = delete tmpDeleteObj.y;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
