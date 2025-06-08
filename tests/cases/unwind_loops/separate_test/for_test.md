# Preval test case

# for_test.md

> Unwind loops > Separate test > For test
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
for (test of $({a: 1})) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````


## Settled


`````js filename=intro
let counter /*:number*/ = 0;
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`yolo`);
    counter = counter + 1;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let counter = 0;
const tmpForOfGen = $forOf($({ a: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
    $(`yolo`);
    counter = counter + 1;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = { a: 1 };
const c = $( b );
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
    $( "yolo" );
    a = a + 1;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
let test = counter < 10;
let tmpCalleeParam$1 = { a: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    test = tmpForOfNext.value;
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
