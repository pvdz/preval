# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b)[$("c")]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
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
$(100);
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
$( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: 100
 - 4: 'c'
 - 5: 100
 - 6: 'c'
 - 7: 100
 - 8: 'c'
 - 9: 100
 - 10: 'c'
 - 11: 100
 - 12: 'c'
 - 13: 100
 - 14: 'c'
 - 15: 100
 - 16: 'c'
 - 17: 100
 - 18: 'c'
 - 19: 100
 - 20: 'c'
 - 21: 100
 - 22: 'c'
 - 23: 100
 - 24: 'c'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
