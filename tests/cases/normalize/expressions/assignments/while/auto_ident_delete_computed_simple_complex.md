# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > While > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete arg[$("y")])) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpClusterSSA_a /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
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
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
if (delete arg[tmpDeleteCompProp]) {
  let a = false;
  while (true) {
    $(100);
    const tmpDeleteCompProp$1 = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
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
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  let d = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const e = $( "y" );
    d = delete b[ e ];
    if (d) {

    }
    else {
      break;
    }
  }
  $( d, b );
}
else {
  $( false, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: 100
 - 3: 'y'
 - 4: 100
 - 5: 'y'
 - 6: 100
 - 7: 'y'
 - 8: 100
 - 9: 'y'
 - 10: 100
 - 11: 'y'
 - 12: 100
 - 13: 'y'
 - 14: 100
 - 15: 'y'
 - 16: 100
 - 17: 'y'
 - 18: 100
 - 19: 'y'
 - 20: 100
 - 21: 'y'
 - 22: 100
 - 23: 'y'
 - 24: 100
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
