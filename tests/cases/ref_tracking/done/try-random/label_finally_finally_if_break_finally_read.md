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
  let $implicitThrow$1___11__ = false;
  let $finalCatchArg$1___15__ = undefined___16__;
  try /*18*/ {
    x___22__ = 2;
  } catch ($finalImplicit$1___24__) /*25*/ {
    $implicitThrow$1___29__ = true;
    $finalCatchArg$1___33__ = $finalImplicit$1___32__;
  }
  $();
  x___40__ = 3;
  let $implicitThrow___43__ = false;
  let $finalStep___47__ = false;
  let $finalCatchArg___51__ = undefined___52__;
  $finally___54__: /*55*/ {
    try /*57*/ {
      x___61__ = 4;
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


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 22,40
  - w @22      | ########## | not read    | 4              | 40
  - w @40      | ########## | 93          | 4,22           | 61,97
  - w @61      | ########## | 93          | 40             | 73,84,97
  - w @73      | ########## | 93,105      | 61             | 97,109
  - w @84      | ########## | 93,105      | 61             | 97,109
  - r @93      | 40,61,73,84
  - w @97      | ########## | not read    | 40,61,73,84    | none
  - r @105     | 73,84
  - w @109     | ########## | 139         | 73,84          | 125
  - w @125     | ########## | not read    | 109            | 135
  - w @135     | ########## | 139         | 125            | none
  - r @139     | 109,135

$implicitThrow$1:
  - w @11            | ########## | 127         | none           | 29
  - w @29            | ########## | 127         | 11             | none
  - r @127           | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 130         | none           | 33
  - w @33            | ########## | 130         | 15             | none
  - r @130           | 15,33

$implicitThrow:
  - w @43            | ########## | 111         | none           | none
  - r @111           | 43

$finalStep:
  - w @47            | ########## | 117         | none           | 77
  - w @77            | ########## | 117         | 47             | none
  - r @117           | 47,77

$finalCatchArg:
  - w @51            | ########## | 114         | none           | none
  - r @114           | 51

tmpIfTest:
  - w @64            | ########## | 68          | none           | none
  - r @68            | 64
