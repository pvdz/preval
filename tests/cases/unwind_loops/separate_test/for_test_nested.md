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
  const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1 };
  const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  while ($LOOP_NO_UNROLLS_LEFT) {
    const tmpForOfNext /*:unknown*/ = tmpForOfGen();
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
    const tmpForOfNext = tmpForOfGen();
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
  while ($LOOP_NO_UNROLLS_LEFT) {
    const f = e();
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    let tmpCalleeParam$1 = { a: 1 };
    let tmpCalleeParam = $(tmpCalleeParam$1);
    const tmpForOfGen = $forOf(tmpCalleeParam);
    while ($LOOP_NO_UNROLLS_LEFT) {
      const tmpForOfNext = tmpForOfGen();
      const tmpIfTest = tmpForOfNext.done;
      if (tmpIfTest) {
        break;
      } else {
        test = tmpForOfNext.value;
      }
    }
  } else {
    break;
  }
}
`````


## Todos triggered


None


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
