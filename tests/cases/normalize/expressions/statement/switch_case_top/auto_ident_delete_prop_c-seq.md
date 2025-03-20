# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Switch case top > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    delete ($(1), $(2), $(arg)).y;
}
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const arg /*:object*/ = { y: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj /*:unknown*/ = $(arg);
  delete tmpDeleteObj.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { y: 1 };
const e = {
  a: 999,
  b: 1000,
};
if (c) {
  $( 1 );
  $( 2 );
  const f = $( d );
  delete f.y;
  $( e, d );
}
else {
  $( e, d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: { y: '1' }
 - 6: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
