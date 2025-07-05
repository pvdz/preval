# Preval test case

# unused_obj.md

> Ref tracking > Rule > Unused obj
>
> Normalization of assignments should work the same everywhere they are

Ref tracking result:

             | reads      | read by     | overWrites     | overwritten by
b:
- w @4       | ########## | 26          | none           | 36
- r @26      | 4,36
- w @36      | ########## | 26,54       | 4,36           | 36
- r @54      | 36

a:
- w @8       | ########## | not read    | none           | 40
- w @40      | ########## | 44,53       | 8,40           | 40
- r @44      | 40
- r @53      | 40

## Input

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while ($LOOP_NO_UNROLLS_LEFT) {
  $(1);
  const lhs = b;
  const sum = lhs + 1;
  b = sum;
  a = sum;
  let test = a;
  if (test) {
  } else {
    break;
  }
}
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:number*/ = 1;
let a /*:number*/ = 0;
while ($LOOP_NO_UNROLLS_LEFT) {
  $(1);
  const sum /*:number*/ = b + 1;
  b = sum;
  a = sum;
  if (sum) {
  } else {
    break;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
let a = 0;
while (true) {
  $(1);
  const sum = b + 1;
  b = sum;
  a = sum;
  if (!sum) {
    break;
  }
}
$(a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 0;
while ($LOOP_NO_UNROLLS_LEFT) {
  $( 1 );
  const c = a + 1;
  a = c;
  b = c;
  if (c) {

  }
  else {
    break;
  }
}
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while ($LOOP_NO_UNROLLS_LEFT) {
  $(1);
  const lhs = b;
  const sum = lhs + 1;
  b = sum;
  a = sum;
  let test = a;
  if (test) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
