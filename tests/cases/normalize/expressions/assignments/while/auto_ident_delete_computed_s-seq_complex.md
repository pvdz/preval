# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > While > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), arg)[$("y")])) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
let a /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
    if (a) {
    } else {
      break;
    }
  }
  $(a, arg);
} else {
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
let a = delete arg[tmpDeleteCompProp];
if (a) {
  while (true) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompProp$1 = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
    if (!a) {
      break;
    }
  }
  $(a, arg);
} else {
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
let c = delete b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const d = $( "y" );
    c = delete b[ d ];
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
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 'y'
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 'y'
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 'y'
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 'y'
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 'y'
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
