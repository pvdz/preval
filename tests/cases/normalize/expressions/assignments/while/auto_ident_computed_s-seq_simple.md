# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, b)[$("c")])) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
let a /*:unknown*/ = b[tmpAssignRhsCompProp];
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsCompProp$1 /*:unknown*/ = $(`c`);
    a = b[tmpAssignRhsCompProp$1];
    if (a) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
let a = b[tmpAssignRhsCompProp];
if (a) {
  while (true) {
    $(100);
    const tmpAssignRhsCompProp$1 = $(`c`);
    a = b[tmpAssignRhsCompProp$1];
    if (!a) {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
let c = b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( "c" );
    c = b[ d ];
    if (c) {

    }
    else {
      break;
    }
  }
  $( c, b );
}
else {
  $( c, b );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 100
 - 3: 'c'
 - 4: 100
 - 5: 'c'
 - 6: 100
 - 7: 'c'
 - 8: 100
 - 9: 'c'
 - 10: 100
 - 11: 'c'
 - 12: 100
 - 13: 'c'
 - 14: 100
 - 15: 'c'
 - 16: 100
 - 17: 'c'
 - 18: 100
 - 19: 'c'
 - 20: 100
 - 21: 'c'
 - 22: 100
 - 23: 'c'
 - 24: 100
 - 25: 'c'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
