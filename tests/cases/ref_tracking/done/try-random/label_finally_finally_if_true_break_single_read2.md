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
      $implicitThrow___64__ = true;
      $finalCatchArg___68__ = $finalImplicit___67__;
    }
  }
  x___72__ = 7;
  if ($implicitThrow___74__) {
    /*75*/ throw $finalCatchArg___77__;
  } /*78*/ else {
    if ($finalStep___80__) {
      /*81*/ break back___83__;
    } /*84*/ else {
      x___88__ = 8;
    }
  }
}
$(x___92__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 92          | none           | 12
  - w @12      | ########## | not read    | 4              | 33,72
  - w @33      | ########## | not read    | 12             | 46,57,72
  - w @46      | ########## | not read    | 33             | 72
  - w @57      | ########## | not read    | 33             | 72
  - w @72      | ########## | 92          | 12,33,46,57    | 88
  - w @88      | ########## | 92          | 72             | none
  - r @92      | 4,72,88

$implicitThrow:
  - w @15          | ########## | 74          | none           | 64
  - w @64          | ########## | 74          | 15             | none
  - r @74          | 15,64

$finalStep:
  - w @19          | ########## | 80          | none           | 50
  - w @50          | ########## | 80          | 19             | none
  - r @80          | 19,50

$finalCatchArg:
  - w @23          | ########## | 77          | none           | 68
  - w @68          | ########## | 77          | 23             | none
  - r @77          | 23,68

tmpIfTest:
  - w @36          | ########## | 41          | none           | none
  - r @41          | 36
