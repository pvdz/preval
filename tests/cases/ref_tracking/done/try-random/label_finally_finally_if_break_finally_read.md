# Preval test case

# label_finally_finally_if_break_finally_read.md

> Ref tracking > Done > Try-random > Label finally finally if break finally read
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;             // overwritten by x=2 and x=3
back: {
  try {
    x = 2;             // overwritten by x=3 (not x=9 because that's only possible by a throw in the finally, which would skip x=9)
  } finally {
    $();
    x = 3;
    try {
      x = 4;
      if ($()) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      $('final', x);   // x=3 4 5 6
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x);                  // x=7 9 (8 is overwritten by 9 but 7 may jump over it) 
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  let $implicitThrow$1___15__ = false;
  let $finalCatchArg$1___18__ = undefined___19__;
  try /*21*/ {
    x___25__ = 2;
  } catch ($finalImplicit$1___27__) /*28*/ {
    $implicitThrow$1___32__ = true;
    $finalCatchArg$1___36__ = $finalImplicit$1___35__;
  }
  $();
  x___43__ = 3;
  let $implicitThrow___45__ = false;
  let $finalStep___48__ = false;
  let $finalCatchArg___51__ = undefined___52__;
  $finally___54__: /*55*/ {
    try /*57*/ {
      x___62__ = 4;
      const tmpIfTest___64__ = $();
      if (tmpIfTest___68__) {
        /*69*/ x___73__ = 5;
        $finalStep___77__ = true;
        break $finally___79__;
      } /*80*/ else {
        x___84__ = 6;
      }
    } catch ($finalImplicit___86__) /*87*/ {
      $(`final`, x___93__);
      x___97__ = 7;
      throw $finalImplicit___99__;
    }
  }
  $(`final`, x___105__);
  x___109__ = 7;
  if ($implicitThrow___111__) {
    /*112*/ throw $finalCatchArg___114__;
  } /*115*/ else {
    if ($finalStep___117__) {
      /*118*/ break back___120__;
    } /*121*/ else {
      x___125__ = 8;
      if ($implicitThrow$1___127__) {
        /*128*/ throw $finalCatchArg$1___130__;
      } /*131*/ else {
        x___135__ = 9;
      }
    }
  }
}
$(x___139__);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 25,43
  - w @25      | ########## | not read    | 4              | 43
  - w @43      | ########## | 93          | 4,25           | 62,97
  - w @62      | ########## | 93          | 43             | 73,84,97
  - w @73      | ########## | 93,105      | 62             | 97,109
  - w @84      | ########## | 93,105      | 62             | 97,109
  - r @93      | 43,62,73,84
  - w @97      | ########## | not read    | 43,62,73,84    | none
  - r @105     | 73,84
  - w @109     | ########## | 139         | 73,84          | 125
  - w @125     | ########## | not read    | 109            | 135
  - w @135     | ########## | 139         | 125            | none
  - r @139     | 109,135

$implicitThrow$1:
  - w @15            | ########## | 127         | none           | 32
  - w @32            | ########## | 127         | 15             | none
  - r @127           | 15,32

$finalCatchArg$1:
  - w @18            | ########## | 130         | none           | 36
  - w @36            | ########## | 130         | 18             | none
  - r @130           | 18,36

$implicitThrow:
  - w @45            | ########## | 111         | none           | none
  - r @111           | 45

$finalStep:
  - w @48            | ########## | 117         | none           | 77
  - w @77            | ########## | 117         | 48             | none
  - r @117           | 48,77

$finalCatchArg:
  - w @51            | ########## | 114         | none           | none
  - r @114           | 51

tmpIfTest:
  - w @64            | ########## | 68          | none           | none
  - r @68            | 64
