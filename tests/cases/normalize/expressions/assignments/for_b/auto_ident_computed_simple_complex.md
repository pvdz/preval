# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = b[$("c")]); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
let a /*:unknown*/ = b[tmpAssignRhsCompProp];
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
    $(1);
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
    $( 1 );
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


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 1
 - 3: 'c'
 - 4: 1
 - 5: 'c'
 - 6: 1
 - 7: 'c'
 - 8: 1
 - 9: 'c'
 - 10: 1
 - 11: 'c'
 - 12: 1
 - 13: 'c'
 - 14: 1
 - 15: 'c'
 - 16: 1
 - 17: 'c'
 - 18: 1
 - 19: 'c'
 - 20: 1
 - 21: 'c'
 - 22: 1
 - 23: 'c'
 - 24: 1
 - 25: 'c'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
