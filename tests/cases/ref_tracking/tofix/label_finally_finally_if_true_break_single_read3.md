# Preval test case

# label_finally_finally_if_true_break_single_read3.md

> Ref tracking > Tofix > Label finally finally if true break single read3
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1; // unobservable
back: {
  x = 3; // unobservable (always becomes 4)
  try {
    x = 4; // unobservable (always becomes 5 unless thrown)
    break back;
  } finally {
    x = 5;
  }
  x = 6; // unreachable
}
$(x); // x=5
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
      $finalStep___37__ = true;
      break $finally___39__;
    } catch ($finalImplicit___41__) /*42*/ {
      $implicitThrow___46__ = true;
      $finalCatchArg___50__ = $finalImplicit___49__;
    }
  }
  x___54__ = 5;
  if ($implicitThrow___56__) {
    /*57*/ throw $finalCatchArg___59__;
  } /*60*/ else {
    break back___62__;
  }
}
$(x___66__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 66          | none           | 12
  - w @12      | ########## | not read    | 4              | 33,54
  - w @33      | ########## | not read    | 12             | 54
  - w @54      | ########## | 66          | 12,33          | none
  - r @66      | 4,54

$implicitThrow:
  - w @15          | ########## | 56          | none           | 46
  - w @46          | ########## | 56          | 15             | none
  - r @56          | 15,46

$finalStep:
  - w @19          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 19             | none

$finalCatchArg:
  - w @23          | ########## | 59          | none           | 50
  - w @50          | ########## | 59          | 23             | none
  - r @59          | 23,50
