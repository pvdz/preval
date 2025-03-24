# Preval test case

# try_catch_finally3.md

> Ref tracking > Done > Try-catch-finally > Try catch finally3

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);           // x=1
  x = 2;
  try {
    $(x);         // x=2
    x = 3;
  } catch (e) {
    $(x);         // x=2 3
    x = 4;
  } finally {
    $(x);         // x=2 3 4 
    if ($()) {
      x = 5;
    }
  }
} catch (e) {
  $(x);           // x=1 2 3 4 5
  x = 6;
} finally {
  $(x);           // x=1 2 3 4 5 6 
  if ($()) {
    x = 7;
  }
}
// Note that 1 and 2 can not reach here because it means that
// the catch threw before overwriting x, but in that case the
// code skips this after leaving the finally.
$(x);             // x=3 4 5 6 7
`````


## Output

(Annotated with pids)

`````filename=intro
let x___9__ = 1;
let $implicitThrow$1___12__ = false;
let $finalStep___15__ = false;
let $finalCatchArg$1___18__ = undefined___19__;
let $finalArg___21__ = undefined___22__;
$finally$1___24__: /*25*/ {
  try /*27*/ {
    $(x___34__);
    x___38__ = 2;
    let $implicitThrow___40__ = false;
    let $finalCatchArg___43__ = undefined___44__;
    try /*46*/ {
      $(x___50__);
      x___54__ = 3;
    } catch ($finalImplicit___56__) /*57*/ {
      $implicitThrow___61__ = true;
      $finalCatchArg___65__ = $finalImplicit___64__;
    }
    $(x___69__);
    const tmpIfTest___71__ = $();
    if (tmpIfTest___75__) {
      /*76*/ x___80__ = 5;
    } /*81*/ else {
    }
    if ($implicitThrow___83__) {
      /*84*/ $finalStep___88__ = true;
      $finalArg___92__ = $finalCatchArg___91__;
      break $finally$1___94__;
    } /*95*/ else {
    }
  } catch ($finalImplicit$1___97__) /*98*/ {
    $implicitThrow$1___102__ = true;
    $finalCatchArg$1___106__ = $finalImplicit$1___105__;
  }
}
$(x___110__);
const tmpIfTest$1___112__ = $();
if (tmpIfTest$1___116__) {
  /*117*/ x___121__ = 7;
} /*122*/ else {
}
if ($implicitThrow$1___124__) {
  /*125*/ throw $finalCatchArg$1___127__;
} /*128*/ else {
  if ($finalStep___130__) {
    /*131*/ throw $finalArg___133__;
  } /*134*/ else {
    $(x___138__);
  }
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @9       | ########## | 34,110,138  | none           | 38,121
  - r @34      | 9
  - w @38      | ########## | 50,69,110,138 | 9              | 54,80,121
  - r @50      | 38
  - w @54      | ########## | 69,110,138  | 38             | 80,121
  - r @69      | 38,54
  - w @80      | ########## | 110,138     | 38,54          | 121
  - r @110     | 9,38,54,80
  - w @121     | ########## | 138         | 9,38,54,80     | none
  - r @138     | 9,38,54,80,121

$implicitThrow$1:
  - w @12            | ########## | 124         | none           | 102
  - w @102           | ########## | 124         | 12             | none
  - r @124           | 12,102

$finalStep:
  - w @15            | ########## | 130         | none           | 88
  - w @88            | ########## | 130         | 15             | none
  - r @130           | 15,88

$finalCatchArg$1:
  - w @18            | ########## | 127         | none           | 106
  - w @106           | ########## | 127         | 18             | none
  - r @127           | 18,106

$finalArg:
  - w @21            | ########## | 133         | none           | 92
  - w @92            | ########## | 133         | 21             | none
  - r @133           | 21,92

$implicitThrow:
  - w @40            | ########## | 83          | none           | 61
  - w @61            | ########## | 83          | 40             | none
  - r @83            | 40,61

$finalCatchArg:
  - w @43            | ########## | 91          | none           | 65
  - w @65            | ########## | 91          | 43             | none
  - r @91            | 43,65

tmpIfTest:
  - w @71            | ########## | 75          | none           | none
  - r @75            | 71

tmpIfTest$1:
  - w @112           | ########## | 116         | none           | none
  - r @116           | 112
