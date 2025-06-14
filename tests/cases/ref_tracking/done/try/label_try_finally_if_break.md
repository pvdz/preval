# Preval test case

# label_try_finally_if_break.md

> Ref tracking > Done > Try > Label try finally if break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  here: {
    $(x);              // x=1
    x = $(2);
    try {
      $(x);            // x=2
      x = $(3);
      break here;
    } finally {
      $(x);            // x=2 3
      x = $(4);
    }
    $(x);              // unreachable (but would be 4 otherwise)
    x = $(5);          // unreachable
  }
  $(x);                // x=4
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = $(1);
/*___9__*/ here: /*10~82*/ {
  $(/*___17__*/ x);
  /*___23__*/ x = $(2);
  let /*___25__*/ $implicitThrow = false;
  let /*___28__*/ $finalStep = false;
  let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
  /*___34__*/ $finally: /*35~64*/ {
    try /*37~53*/ {
      $(/*___41__*/ x);
      /*___47__*/ x = $(3);
      /*___51__*/ $finalStep = true;
      break /*___53__*/ $finally;
    } catch (/*___55__*/ $finalImplicit) /*56~64*/ {
      /*___60__*/ $implicitThrow = true;
      /*___64__*/ $finalCatchArg = /*___63__*/ $finalImplicit;
    }
  }
  $(/*___68__*/ x);
  /*___74__*/ x = $(4);
  if (/*___76__*/ $implicitThrow) {
    /*77~79*/ throw /*___79__*/ $finalCatchArg;
  } /*80~82*/ else {
    break /*___82__*/ here;
  }
}
$(/*___86__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17          | none           | 23
  - r @17      | 4
  - w @23      | ########## | 41,68       | 4              | 47,74
  - r @41      | 23
  - w @47      | ########## | 68          | 23             | 74
  - r @68      | 23,47
  - w @74      | ########## | 86          | 23,47          | none
  - r @86      | 74

$implicitThrow:
  - w @25          | ########## | 76          | none           | 60
  - w @60          | ########## | 76          | 25             | none
  - r @76          | 25,60

$finalStep:
  - w @28          | ########## | not read    | none           | 51
  - w @51          | ########## | not read    | 28             | none

$finalCatchArg:
  - w @31          | ########## | 79          | none           | 64
  - w @64          | ########## | 79          | 31             | none
  - r @79          | 31,64

$finalImplicit:
  - w @55          | ########## | 63          | none           | none
  - r @63          | 55
