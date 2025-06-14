# Preval test case

# while_multi_let.md

> Ref tracking > Done > While-if > While multi let
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
let y = 2;
let z = 3;
while ($) {
  $(x);
  x = 10;
  if ($()) {
    y = 20;
    if ($()) {
      z = 30;
    }
  }
  if (x > y) {
    break;
  }
}
$(x, y, z);

//
//$('------ 1');
//
//// SSA
//{
//  let x = 1;
//  let y = 2;
//  let z = 3;
//  function $continue(x, y, z) {
//    $(x);
//    x = 10;
//    if ($()) {
//      y = 20;
//      if ($()) {
//        z = 30;
//      }
//    }
//    if (x > y) {
//      $break(x, y, z);
//      return;
//    }
//    $continue(x, y, z);
//    return;
//  }
//  $continue(x, y, z);
//  function $break(x, y, z) {
//    $(x, y, z);
//  }
//}
//
//$('------ 2');
//
//{
//  function $continue(y, z) {
//    if ($()) {
//      y = 20;
//      if ($()) {
//        z = 30;
//      }
//    }
//    if (10 > y) {
//      $(10, y, z);
//    } else {
//      $(10);
//      $continue(y, z);
//    }
//  }
//  $(1);
//  $continue(2, 3);
//}
//
//$('------ 3');
//
//{
//  function $continue(y, z) {
//    if ($()) {
//      if ($()) {
//        $(10);
//        $continue(20, 30);
//      } else {
//        $(10);
//        $continue(20, z);
//      }
//    } else {
//      if (10 > y) {
//        $(10, y, z);
//      } else {
//        $(10);
//        $continue(y, z);
//      }
//    }
//  }
//  $(1);
//  $continue(2, 3);
//}
//
//$('------ 4');
//
//{
//  let y = 2;
//  let z = 3;
//  $(1);
//  while (true) {
//    if ($()) {
//      $(10);
//      y = 20;
//      if ($()) {
//        z = 30;
//      } else {
//      }
//    } else {
//      if (10 > y) {
//        $(10, y, z); // It _is_ possible to deduct that this must be $(10, 2, 3) but extremely hard to make that work and then also generic.
//        break;
//      } else {
//        $(10);
//      }
//    }
//  }
//}

`````


## Output

(Annotated with pids)

`````filename=intro
let /*___6__*/ x = 1;
let /*___9__*/ y = 2;
let /*___12__*/ z = 3;
while (true) {
  /*16~66*/ if ($) {
    /*19~64*/ $(/*___25__*/ x);
    /*___29__*/ x = 10;
    const /*___31__*/ tmpIfTest = $();
    if (/*___35__*/ tmpIfTest) {
      /*36~53*/ /*___41__*/ y = 20;
      const /*___43__*/ tmpIfTest$1 = $();
      if (/*___47__*/ tmpIfTest$1) {
        /*48~52*/ /*___52__*/ z = 30;
      } /*53~53*/ else {
      }
    } /*54~54*/ else {
    }
    const /*___56__*/ tmpIfTest$3 = /*___58__*/ x > /*___59__*/ y;
    if (/*___61__*/ tmpIfTest$3) {
      /*62~63*/ break;
    } /*64~64*/ else {
    }
  } /*65~66*/ else {
    break;
  }
}
$(/*___70__*/ x, /*___71__*/ y, /*___72__*/ z);
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 25,70       | none           | 29
  - r @25      | 6,29
  - w @29      | ########## | 25,58,70    | 6,29           | 29
  - r @58      | 29
  - r @70      | 6,29

y:
  - w @9       | ########## | 59,71       | none           | 41
  - w @41      | ########## | 59,71       | 9,41           | 41
  - r @59      | 9,41
  - r @71      | 9,41

z:
  - w @12      | ########## | 72          | none           | 52
  - w @52      | ########## | 72          | 12,52          | 52
  - r @72      | 12,52

tmpIfTest:
  - w @31      | ########## | 35          | none           | none
  - r @35      | 31

tmpIfTest$1:
  - w @43       | ########## | 47          | none           | none
  - r @47       | 43

tmpIfTest$3:
  - w @56       | ########## | 61          | none           | none
  - r @61       | 56
