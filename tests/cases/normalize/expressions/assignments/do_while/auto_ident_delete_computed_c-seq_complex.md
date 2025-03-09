# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete ($(1), $(2), $(arg))[$("y")]));
$(a, arg);
`````

## Settled


`````js filename=intro
let a /*:boolean*/ = false;
$(100);
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    if (a) {
    } else {
      break;
    }
  }
  $(a, arg);
} else {
  $(false, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = false;
$(100);
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
if (delete tmpDeleteCompObj[tmpDeleteCompProp]) {
  while (true) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompObj$1 = $(arg);
    const tmpDeleteCompProp$1 = $(`y`);
    a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    if (!a) {
      break;
    }
  }
  $(a, arg);
} else {
  $(false, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = delete ($(1), $(2), $(arg))[$(`y`)])) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = false;
$( 100 );
$( 1 );
$( 2 );
const b = { y: 1 };
const c = $( b );
const d = $( "y" );
const e = delete c[ d ];
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const f = $( b );
    const g = $( "y" );
    a = delete f[ g ];
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( false, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: {}
 - 10: 'y'
 - 11: 100
 - 12: 1
 - 13: 2
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check