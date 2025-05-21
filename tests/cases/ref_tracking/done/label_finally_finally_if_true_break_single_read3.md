# Preval test case

# label_finally_finally_if_true_break_single_read3.md

> Ref tracking > Done > Label finally finally if true break single read3
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;      // unobservable
back: {
  x = 3;        // unobservable (always becomes 4)
  try {
    x = 4;      // unobservable (always becomes 5 unless thrown)
    break back;
  } finally {
    x = 5;
  }
  x = 6;        // unreachable
}
$(x);           // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  x___15__ = 3;
  let $implicitThrow___17__ = false;
  let $finalStep___20__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  $finally___26__: /*27*/ {
    try /*29*/ {
      x___33__ = 4;
      $finalStep___37__ = true;
      break $finally___39__;
    } catch ($finalImplicit___41__) /*42*/ {
      x___46__ = 5;
      throw $finalImplicit___48__;
    }
  }
  x___52__ = 5;
  if ($implicitThrow___54__) {
    /*55*/ throw $finalCatchArg___57__;
  } /*58*/ else {
    break back___60__;
  }
}
$(x___64__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 15
  - w @15      | ########## | not read    | 4              | 33,46,52
  - w @33      | ########## | not read    | 15             | 46,52
  - w @46      | ########## | not read    | 15,33          | none
  - w @52      | ########## | 64          | 15,33          | none
  - r @64      | 52

$implicitThrow:
  - w @17          | ########## | 54          | none           | none
  - r @54          | 17

$finalStep:
  - w @20          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 20             | none

$finalCatchArg:
  - w @23          | ########## | 57          | none           | none
  - r @57          | 23

$finalImplicit:
  - w @41          | ########## | 48          | none           | none
  - r @48          | 41
