# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case delete arg.y:
}
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
const arg /*:object*/ /*truthy*/ = { y: 1 };
delete arg.y;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const arg = { y: 1 };
delete arg.y;
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { y: 1 };
delete a.y;
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = delete arg.y;
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
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
