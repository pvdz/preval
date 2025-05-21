# Preval test case

# break-finally-cond.md

> Ref tracking > Tofix > Break-finally-cond

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      if ($) {
        x = 2;
        break here;
      }
      x = 3;
    } finally {
      // x=1 when $ is not defined (crash)
      // x=2 when $ is truthy
      // x=3 when $ is falsy
      $(x); // x=1 2 3
    }

    $(x); // x=3 (only!)
    x = 4;
  }
  
  $(x); // x=2 4 (because 1 is a crash so 1 skips this)
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  let $implicitThrow___13__ = false;
  let $finalStep___16__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  $finally___22__: /*23*/ {
    try /*25*/ {
      if ($) {
        /*28*/ x___32__ = 2;
        $finalStep___36__ = true;
        break $finally___38__;
      } /*39*/ else {
        x___43__ = 3;
      }
    } catch ($finalImplicit___45__) /*46*/ {
      $(x___50__);
      throw $finalImplicit___52__;
    }
  }
  $(x___56__);
  if ($implicitThrow___58__) {
    /*59*/ throw $finalCatchArg___61__;
  } /*62*/ else {
    if ($finalStep___64__) {
      /*65*/ break here___67__;
    } /*68*/ else {
      $(x___72__);
      x___76__ = 4;
    }
  }
}
$(x___80__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 50          | none           | 32,43
  - w @32      | ########## | 50,56,72,80 | 4              | 76
  - w @43      | ########## | 50,56,72,80 | 4              | 76
  - r @50      | 4,32,43
  - r @56      | 32,43
  - r @72      | 32,43
  - w @76      | ########## | 80          | 32,43          | none
  - r @80      | 32,43,76

$implicitThrow:
  - w @13          | ########## | 58          | none           | none
  - r @58          | 13

$finalStep:
  - w @16          | ########## | 64          | none           | 36
  - w @36          | ########## | 64          | 16             | none
  - r @64          | 16,36

$finalCatchArg:
  - w @19          | ########## | 61          | none           | none
  - r @61          | 19

$finalImplicit:
  - w @45          | ########## | 52          | none           | none
  - r @52          | 45
