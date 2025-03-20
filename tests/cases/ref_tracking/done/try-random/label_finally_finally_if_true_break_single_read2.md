# Preval test case

# label_finally_finally_if_true_break_single_read2.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read2
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  x = 3;
  try {
    x = 4;
    if ($(true)) {
      x = 5;
      break back;
    }
    x = 6;
  } finally {
    x = 7;
  }
  x = 8;
}
$(x); // x=7 8
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  x___12__ = 3;
  let $implicitThrow___15__ = false;
  let $finalStep___19__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  $finally___26__: /*27*/ {
    try /*29*/ {
      x___33__ = 4;
      const tmpIfTest___36__ = $(true);
      if (tmpIfTest___41__) {
        /*42*/ x___46__ = 5;
        $finalStep___50__ = true;
        break $finally___52__;
      } /*53*/ else {
        x___57__ = 6;
      }
    } catch ($finalImplicit___59__) /*60*/ {
      x___64__ = 7;
      throw $finalImplicit___66__;
    }
  }
  x___70__ = 7;
  if ($implicitThrow___72__) {
    /*73*/ throw $finalCatchArg___75__;
  } /*76*/ else {
    if ($finalStep___78__) {
      /*79*/ break back___81__;
    } /*82*/ else {
      x___86__ = 8;
    }
  }
}
$(x___90__);
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4              | 33,64
  - w @33      | ########## | not read    | 12             | 46,57,64
  - w @46      | ########## | not read    | 33             | 64,70
  - w @57      | ########## | not read    | 33             | 64,70
  - w @64      | ########## | not read    | 12,33,46,57    | none
  - w @70      | ########## | 90          | 46,57          | 86
  - w @86      | ########## | 90          | 70             | none
  - r @90      | 70,86

$implicitThrow:
  - w @15          | ########## | 72          | none           | none
  - r @72          | 15

$finalStep:
  - w @19          | ########## | 78          | none           | 50
  - w @50          | ########## | 78          | 19             | none
  - r @78          | 19,50

$finalCatchArg:
  - w @23          | ########## | 75          | none           | none
  - r @75          | 23

tmpIfTest:
  - w @36          | ########## | 41          | none           | none
  - r @41          | 36
