# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Logic and right > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(100) && ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  $(a, tmpObjLitVal, tmpObjLitVal$1);
} else {
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, $(3), $(4));
} else {
  $(a, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 3 );
  const d = $( 4 );
  $( b, c, d );
}
else {
  $( b, 1, 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
