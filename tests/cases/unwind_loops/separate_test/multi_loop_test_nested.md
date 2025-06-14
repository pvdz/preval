# Preval test case

# multi_loop_test_nested.md

> Unwind loops > Separate test > Multi loop test nested
>
> Unrolling loops

## Input

`````js filename=intro
{
let counter = 0;
let test = counter < 10;
while (test) {
  while (test) {
    $('yolo');
    counter = counter + 1;
    test = counter < 10;
  }
}
}
`````


## Settled


`````js filename=intro
let counter /*:number*/ = 0;
while (true) {
  $(`yolo`);
  const tmpClusterSSA_counter /*:number*/ = counter + 1;
  const tmpClusterSSA_test /*:boolean*/ = tmpClusterSSA_counter < 10;
  if (tmpClusterSSA_test) {
    $(`yolo`);
    counter = tmpClusterSSA_counter + 1;
    let tmpClusterSSA_test$1 /*:boolean*/ = counter < 10;
    while ($LOOP_UNROLL_9) {
      if (tmpClusterSSA_test$1) {
        $(`yolo`);
        counter = counter + 1;
        tmpClusterSSA_test$1 = counter < 10;
      } else {
        break;
      }
    }
    if (tmpClusterSSA_test$1) {
    } else {
      break;
    }
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let counter = 0;
while (true) {
  $(`yolo`);
  const tmpClusterSSA_counter = counter + 1;
  if (tmpClusterSSA_counter < 10) {
    $(`yolo`);
    counter = tmpClusterSSA_counter + 1;
    let tmpClusterSSA_test$1 = counter < 10;
    while (true) {
      if (tmpClusterSSA_test$1) {
        $(`yolo`);
        counter = counter + 1;
        tmpClusterSSA_test$1 = counter < 10;
      } else {
        break;
      }
    }
    if (!tmpClusterSSA_test$1) {
      break;
    }
  } else {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
while (true) {
  $( "yolo" );
  const b = a + 1;
  const c = b < 10;
  if (c) {
    $( "yolo" );
    a = b + 1;
    let d = a < 10;
    while ($LOOP_UNROLL_9) {
      if (d) {
        $( "yolo" );
        a = a + 1;
        d = a < 10;
      }
      else {
        break;
      }
    }
    if (d) {

    }
    else {
      break;
    }
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
    while (true) {
      if (test) {
        $(`yolo`);
        counter = counter + 1;
        test = counter < 10;
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'yolo'
 - 2: 'yolo'
 - 3: 'yolo'
 - 4: 'yolo'
 - 5: 'yolo'
 - 6: 'yolo'
 - 7: 'yolo'
 - 8: 'yolo'
 - 9: 'yolo'
 - 10: 'yolo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
