# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Switch case test > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })):
}
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(1);
$(2);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$({ a: 999, b: 1000 }, tmpObjLitVal, tmpObjLitVal$1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
let tmpBinBothRhs = undefined;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, x, y);
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
 - 4: 3
 - 5: 4
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
