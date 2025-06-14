# Preval test case

# label_finally_finally_if_true_break_single_read4.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read4
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
  try {
    break back;
  } finally {
  }
  x = 6; // unreachable
}
$(x); // x=1
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ back: /*8~50*/ {
  let /*___13__*/ $implicitThrow = false;
  let /*___16__*/ $finalStep = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /*___22__*/ $finally: /*23~42*/ {
    try /*25~31*/ {
      /*___29__*/ $finalStep = true;
      break /*___31__*/ $finally;
    } catch (/*___33__*/ $finalImplicit) /*34~42*/ {
      /*___38__*/ $implicitThrow = true;
      /*___42__*/ $finalCatchArg = /*___41__*/ $finalImplicit;
    }
  }
  if (/*___44__*/ $implicitThrow) {
    /*45~47*/ throw /*___47__*/ $finalCatchArg;
  } /*48~50*/ else {
    break /*___50__*/ back;
  }
}
$(/*___54__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 54          | none           | none
  - r @54      | 4

$implicitThrow:
  - w @13          | ########## | 44          | none           | 38
  - w @38          | ########## | 44          | 13             | none
  - r @44          | 13,38

$finalStep:
  - w @16          | ########## | not read    | none           | 29
  - w @29          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | 47          | none           | 42
  - w @42          | ########## | 47          | 19             | none
  - r @47          | 19,42

$finalImplicit:
  - w @33          | ########## | 41          | none           | none
  - r @41          | 33
