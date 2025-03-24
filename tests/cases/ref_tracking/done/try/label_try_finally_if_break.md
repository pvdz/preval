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
let x___4__ = $(1);
here___9__: /*10*/ {
  $(x___17__);
  x___23__ = $(2);
  let $implicitThrow___25__ = false;
  let $finalStep___28__ = false;
  let $finalCatchArg___31__ = undefined___32__;
  $finally___34__: /*35*/ {
    try /*37*/ {
      $(x___41__);
      x___47__ = $(3);
      $finalStep___51__ = true;
      break $finally___53__;
    } catch ($finalImplicit___55__) /*56*/ {
      $implicitThrow___60__ = true;
      $finalCatchArg___64__ = $finalImplicit___63__;
    }
  }
  $(x___68__);
  x___74__ = $(4);
  if ($implicitThrow___76__) {
    /*77*/ throw $finalCatchArg___79__;
  } /*80*/ else {
    break here___82__;
  }
}
$(x___86__);
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
