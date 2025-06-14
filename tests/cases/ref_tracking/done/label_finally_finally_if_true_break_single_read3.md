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
let /*___4__*/ x = 1;
/*___7__*/ back: /*8~60*/ {
  /*___15__*/ x = 3;
  let /*___17__*/ $implicitThrow = false;
  let /*___20__*/ $finalStep = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /*___26__*/ $finally: /*27~48*/ {
    try /*29~39*/ {
      /*___33__*/ x = 4;
      /*___37__*/ $finalStep = true;
      break /*___39__*/ $finally;
    } catch (/*___41__*/ $finalImplicit) /*42~48*/ {
      /*___46__*/ x = 5;
      throw /*___48__*/ $finalImplicit;
    }
  }
  /*___52__*/ x = 5;
  if (/*___54__*/ $implicitThrow) {
    /*55~57*/ throw /*___57__*/ $finalCatchArg;
  } /*58~60*/ else {
    break /*___60__*/ back;
  }
}
$(/*___64__*/ x);
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
