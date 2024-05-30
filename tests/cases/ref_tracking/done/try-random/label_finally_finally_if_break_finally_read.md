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
      $implicitThrow___91__ = true;
      $finalCatchArg___95__ = $finalImplicit___94__;
    }
  }
  $(`final`, x___101__);
  x___105__ = 7;
  if ($implicitThrow___107__) {
    /*108*/ throw $finalCatchArg___110__;
  } /*111*/ else {
    if ($finalStep___113__) {
      /*114*/ break back___116__;
    } /*117*/ else {
      x___121__ = 8;
      if ($implicitThrow$1___123__) {
        /*124*/ throw $finalCatchArg$1___126__;
      } /*127*/ else {
        x___131__ = 9;
      }
    }
  }
}
$(x___135__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 135         | none           | 22,40
  - w @22      | ########## | not read    | 4              | 40
  - w @40      | ########## | 101         | 4,22           | 61,105
  - w @61      | ########## | 101         | 40             | 73,84,105
  - w @73      | ########## | 101         | 61             | 105
  - w @84      | ########## | 101         | 61             | 105
  - r @101     | 40,61,73,84
  - w @105     | ########## | 135         | 40,61,73,84    | 121
  - w @121     | ########## | not read    | 105            | 131
  - w @131     | ########## | 135         | 121            | none
  - r @135     | 4,105,131

$implicitThrow$1:
  - w @11            | ########## | 123         | none           | 29
  - w @29            | ########## | 123         | 11             | none
  - r @123           | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 126         | none           | 33
  - w @33            | ########## | 126         | 15             | none
  - r @126           | 15,33

$implicitThrow:
  - w @43            | ########## | 107         | none           | 91
  - w @91            | ########## | 107         | 43             | none
  - r @107           | 43,91

$finalStep:
  - w @47            | ########## | 113         | none           | 77
  - w @77            | ########## | 113         | 47             | none
  - r @113           | 47,77

$finalCatchArg:
  - w @51            | ########## | 110         | none           | 95
  - w @95            | ########## | 110         | 51             | none
  - r @110           | 51,95

tmpIfTest:
  - w @64            | ########## | 68          | none           | none
  - r @68            | 64
