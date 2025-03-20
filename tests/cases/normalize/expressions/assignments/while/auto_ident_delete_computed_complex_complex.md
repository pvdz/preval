# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete $(arg)[$("y")])) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
let a /*:boolean*/ = false;
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
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
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
if (delete tmpDeleteCompObj[tmpDeleteCompProp]) {
  while (true) {
    $(100);
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


## PST Settled
With rename=true

`````js filename=intro
let a = false;
const b = { y: 1 };
const c = $( b );
const d = $( "y" );
const e = delete c[ d ];
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
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


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 100
 - 4: {}
 - 5: 'y'
 - 6: 100
 - 7: {}
 - 8: 'y'
 - 9: 100
 - 10: {}
 - 11: 'y'
 - 12: 100
 - 13: {}
 - 14: 'y'
 - 15: 100
 - 16: {}
 - 17: 'y'
 - 18: 100
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: {}
 - 23: 'y'
 - 24: 100
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
