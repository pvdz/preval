# Preval test case

# for_test_nested.md

> Unwind loops > Separate test > For test nested
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  for (test of $({a: 1})) {}
}
`````


## Settled


`````js filename=intro
let counter /*:number*/ = 0;
let test /*:unknown*/ = true;
while (true) {
  $(`yolo`);
  counter = counter + 1;
  const tmpCalleeParam$1 /*:object*/ = { a: 1 };
  const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
    const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      test = tmpForOfNext.value;
    }
  }
  if (test) {
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let counter = 0;
let test = true;
while (true) {
  $(`yolo`);
  counter = counter + 1;
  const tmpForOfGen = $forOf($({ a: 1 }));
  while (true) {
    const tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      test = tmpForOfNext.value;
    }
  }
  if (!test) {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
let b = true;
while (true) {
  $( "yolo" );
  a = a + 1;
  const c = { a: 1 };
  const d = $( c );
  const e = $forOf( d );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const f = e.next();
    const g = f.done;
    if (g) {
      break;
    }
    else {
      b = f.value;
    }
  }
  if (b) {

  }
  else {
    break;
  }
}
`````


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'yolo'
 - 2: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
