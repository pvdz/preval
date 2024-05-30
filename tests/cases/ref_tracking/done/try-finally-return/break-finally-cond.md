# Preval test case

# break-finally-cond.md

> Ref tracking > Done > Try-finally-return > Break-finally-cond

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
  let $implicitThrow___11__ = false;
  let $finalStep___15__ = false;
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
      $implicitThrow___50__ = true;
      $finalCatchArg___54__ = $finalImplicit___53__;
    }
  }
  $(x___58__);
  if ($implicitThrow___60__) {
    /*61*/ throw $finalCatchArg___63__;
  } /*64*/ else {
    if ($finalStep___66__) {
      /*67*/ break here___69__;
    } /*70*/ else {
      $(x___74__);
      x___78__ = 4;
    }
  }
}
$(x___82__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 58,74,82    | none           | 32,43,78
  - w @32      | ########## | 58,74,82    | 4              | 78
  - w @43      | ########## | 58,74,82    | 4              | 78
  - r @58      | 4,32,43
  - r @74      | 4,32,43
  - w @78      | ########## | 82          | 4,32,43        | none
  - r @82      | 4,32,43,78

$implicitThrow:
  - w @11          | ########## | 60          | none           | 50
  - w @50          | ########## | 60          | 11             | none
  - r @60          | 11,50

$finalStep:
  - w @15          | ########## | 66          | none           | 36
  - w @36          | ########## | 66          | 15             | none
  - r @66          | 15,36

$finalCatchArg:
  - w @19          | ########## | 63          | none           | 54
  - w @54          | ########## | 63          | 19             | none
  - r @63          | 19,54
