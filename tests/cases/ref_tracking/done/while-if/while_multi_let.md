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
let x___4__ = 1;
let y___8__ = 2;
let z___12__ = 3;
while (true) {
  /*16*/ if ($) {
    /*19*/ $(x___23__);
    x___27__ = 10;
    const tmpIfTest___30__ = $();
    if (tmpIfTest___34__) {
      /*35*/ y___39__ = 20;
      const tmpIfTest$1___42__ = $();
      if (tmpIfTest$1___46__) {
        /*47*/ z___51__ = 30;
      } /*52*/ else {
      }
    } /*53*/ else {
    }
    const tmpIfTest$3___56__ = x___58__ > y___59__;
    if (tmpIfTest$3___61__) {
      /*62*/ break;
    } /*64*/ else {
    }
  } /*65*/ else {
    break;
  }
}
$(x___70__, y___71__, z___72__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23,70       | none           | 27
  - r @23      | 4,27
  - w @27      | ########## | 58,23,70    | 4,27           | 27
  - r @58      | 27
  - r @70      | 27,4

y:
  - w @8       | ########## | 59,71       | none           | 39
  - w @39      | ########## | 59,71       | 8,39           | 39
  - r @59      | 8,39
  - r @71      | 8,39

z:
  - w @12      | ########## | 72          | none           | 51
  - w @51      | ########## | 72          | 12,51          | 51
  - r @72      | 12,51

tmpIfTest:
  - w @30      | ########## | 34          | none           | none
  - r @34      | 30

tmpIfTest$1:
  - w @42       | ########## | 46          | none           | none
  - r @46       | 42

tmpIfTest$3:
  - w @56       | ########## | 61          | none           | none
  - r @61       | 56
