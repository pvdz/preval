# Preval test case

# loop_boundary.md

> Ref tracking > Done > While-if > Loop boundary
>
> If there was a reference after the loop, it must reflect the value of the binding
> after mutations inside the loop. So in that case we can't SSA inside the loop.
> If there aren't any after the loop, then we can only SSA if there were no reads
> before the write. But that gets complicated by conditional branching, like:
>     `let x = 5; while (true) { if (false) x = 6; else $(x); }`
> In this case we see the write-ref before the read-ref, but we obviously can't apply
> SSA inside the loop because it will fail hard. We need more solid write tracking
> for this. As such we currently can't reliably apply SSA cross-loop boundaries.

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) {
  if ($(false)) {
    x = 6;
  } else {
    $(x); // x=5 or x=6
  }
  if ($(true)) {
    break;
  }
}
$(x); // x=5 or x=6





//// SSA
//{
//  let x = 5;
//  loopBody(x);
//  
//  function loopBody($$1) {
//    let x = $$1;
//    if ($(false)) {
//      let y = 6;
//      if ($(true)) {
//        $(y);
//      } else {
//        loopBody(y);
//      }
//    } else {
//      $(x); // x=5 or x=6
//      if ($(true)) {
//        $(x);
//      } else {
//        loopBody(x);
//      }
//    }
//  }
//}
//
//
//// SSA v2
//{
//  function $continue(x) {
//    if ($(false)) {
//      x = 6;
//    } else {
//      $(x); // x=5 or x=6
//    }
//    if ($(true)) {
//      $break(x);
//      return;
//    }
//    $continue(x);
//    return;
//  }
//  function $break(x) {
//    $(x); // x=5 or x=6
//  }
//  
//  let x = 5;
//  $continue(x);
//}
//
//
//{
//  function $continue(x) {
//    if ($(false)) {
//      x = 6;
//    } else {
//      $(x); // x=5 or x=6
//    }
//    if ($(true)) {
//      $(x); // x=5 or x=6
//      return;
//    }
//    $continue(x);
//    return;
//  }
//  
//  let x = 5;
//  $continue(x);
//}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
while (true) {
  /*8*/ const tmpIfTest___11__ = $(false);
  if (tmpIfTest___16__) {
    /*17*/ x___21__ = 6;
  } /*22*/ else {
    $(x___26__);
  }
  const tmpIfTest$1___29__ = $(true);
  if (tmpIfTest$1___34__) {
    /*35*/ break;
  } /*37*/ else {
  }
}
$(x___41__);
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 26,41       | none           | 21
  - w @21      | ########## | 26,41       | 4,21           | 21
  - r @26      | 4,21
  - r @41      | 4,21

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11

tmpIfTest$1:
  - w @29       | ########## | 34          | none           | none
  - r @34       | 29
