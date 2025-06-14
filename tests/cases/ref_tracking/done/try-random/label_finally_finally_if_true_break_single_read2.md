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
let /*___4__*/ x = 1;
/*___7__*/ back: /*8~86*/ {
  /*___15__*/ x = 3;
  let /*___17__*/ $implicitThrow = false;
  let /*___20__*/ $finalStep = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /*___26__*/ $finally: /*27~66*/ {
    try /*29~57*/ {
      /*___34__*/ x = 4;
      const /*___36__*/ tmpIfTest = $(true);
      if (/*___41__*/ tmpIfTest) {
        /*42~52*/ /*___46__*/ x = 5;
        /*___50__*/ $finalStep = true;
        break /*___52__*/ $finally;
      } /*53~57*/ else {
        /*___57__*/ x = 6;
      }
    } catch (/*___59__*/ $finalImplicit) /*60~66*/ {
      /*___64__*/ x = 7;
      throw /*___66__*/ $finalImplicit;
    }
  }
  /*___70__*/ x = 7;
  if (/*___72__*/ $implicitThrow) {
    /*73~75*/ throw /*___75__*/ $finalCatchArg;
  } /*76~86*/ else {
    if (/*___78__*/ $finalStep) {
      /*79~81*/ break /*___81__*/ back;
    } /*82~86*/ else {
      /*___86__*/ x = 8;
    }
  }
}
$(/*___90__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 15
  - w @15      | ########## | not read    | 4              | 34,64
  - w @34      | ########## | not read    | 15             | 46,57,64
  - w @46      | ########## | not read    | 34             | 64,70
  - w @57      | ########## | not read    | 34             | 64,70
  - w @64      | ########## | not read    | 15,34,46,57    | none
  - w @70      | ########## | 90          | 46,57          | 86
  - w @86      | ########## | 90          | 70             | none
  - r @90      | 70,86

$implicitThrow:
  - w @17          | ########## | 72          | none           | none
  - r @72          | 17

$finalStep:
  - w @20          | ########## | 78          | none           | 50
  - w @50          | ########## | 78          | 20             | none
  - r @78          | 20,50

$finalCatchArg:
  - w @23          | ########## | 75          | none           | none
  - r @75          | 23

tmpIfTest:
  - w @36          | ########## | 41          | none           | none
  - r @41          | 36

$finalImplicit:
  - w @59          | ########## | 66          | none           | none
  - r @66          | 59
