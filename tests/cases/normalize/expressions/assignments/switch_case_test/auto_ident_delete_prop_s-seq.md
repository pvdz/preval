# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = delete ($(1), $(2), arg).y):
}
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(1);
$(2);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
const arg = { y: 1 };
$(delete arg.y, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
const tmpBinBothRhs = a;
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
 - 2: 1
 - 3: 2
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
