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
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalStep___12__ = false;
let $finalCatchArg$1___16__ = undefined___17__;
let $finalArg___20__ = undefined___21__;
$finally$1___23__: /*24*/ {
  try /*26*/ {
    $(x___30__);
    x___34__ = 2;
    let $implicitThrow___37__ = false;
    let $finalCatchArg___41__ = undefined___42__;
    try /*44*/ {
      $(x___48__);
      x___52__ = 3;
    } catch ($finalImplicit___54__) /*55*/ {
      $implicitThrow___59__ = true;
      $finalCatchArg___63__ = $finalImplicit___62__;
    }
    $(x___67__);
    const tmpIfTest___70__ = $();
    if (tmpIfTest___74__) {
      /*75*/ x___79__ = 5;
    } /*80*/ else {
    }
    if ($implicitThrow___82__) {
      /*83*/ $finalStep___87__ = true;
      $finalArg___91__ = $finalCatchArg___90__;
      break $finally$1___93__;
    } /*94*/ else {
    }
  } catch ($finalImplicit$1___96__) /*97*/ {
    $implicitThrow$1___101__ = true;
    $finalCatchArg$1___105__ = $finalImplicit$1___104__;
  }
}
$(x___109__);
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
  - w @4       | ########## | 30,109,138  | none           | 34,121
  - r @30      | 4
  - w @34      | ########## | 48,67,109,138 | 4              | 52,79,121
  - r @48      | 34
  - w @52      | ########## | 67,109,138  | 34             | 79,121
  - r @67      | 34,52
  - w @79      | ########## | 109,138     | 34,52          | 121
  - r @109     | 4,34,52,79
  - w @121     | ########## | 138         | 4,34,52,79     | none
  - r @138     | 4,34,52,79,121

$implicitThrow$1:
  - w @8             | ########## | 124         | none           | 101
  - w @101           | ########## | 124         | 8              | none
  - r @124           | 8,101

$finalStep:
  - w @12            | ########## | 130         | none           | 87
  - w @87            | ########## | 130         | 12             | none
  - r @130           | 12,87

$finalCatchArg$1:
  - w @16            | ########## | 127         | none           | 105
  - w @105           | ########## | 127         | 16             | none
  - r @127           | 16,105

$finalArg:
  - w @20            | ########## | 133         | none           | 91
  - w @91            | ########## | 133         | 20             | none
  - r @133           | 20,91

$implicitThrow:
  - w @37            | ########## | 82          | none           | 59
  - w @59            | ########## | 82          | 37             | none
  - r @82            | 37,59

$finalCatchArg:
  - w @41            | ########## | 90          | none           | 63
  - w @63            | ########## | 90          | 41             | none
  - r @90            | 41,63

tmpIfTest:
  - w @70            | ########## | 74          | none           | none
  - r @74            | 70

tmpIfTest$1:
  - w @112           | ########## | 116         | none           | none
  - r @116           | 112
