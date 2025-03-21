# Preval test case

# finally_catch_finally.md

> Ref tracking > Done > Try-finally > Finally catch finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
} finally {
  $(x);       // x=1 2 3 4 5
}
$(x);         // x=4 5
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalStep___12__ = false;
let $finalStep$1___16__ = false;
let $finalCatchArg$1___20__ = undefined___21__;
let $finalArg___24__ = undefined___25__;
let $finalArg$1___28__ = undefined___29__;
$finally$1___31__: /*32*/ {
  try /*34*/ {
    $(x___38__);
    x___42__ = 2;
    let $implicitThrow___45__ = false;
    let $finalCatchArg___49__ = undefined___50__;
    try /*52*/ {
      $(x___56__);
      x___60__ = 3;
    } catch ($finalImplicit___62__) /*63*/ {
      $(x___67__);
      x___71__ = 4;
      $finalStep___75__ = true;
      $finalArg___79__ = $finalImplicit___78__;
      break $finally$1___81__;
    }
    $(x___85__);
    x___89__ = 4;
    if ($implicitThrow___91__) {
      /*92*/ $finalStep$1___96__ = true;
      $finalArg$1___100__ = $finalCatchArg___99__;
      break $finally$1___102__;
    } /*103*/ else {
    }
  } catch ($finalImplicit$1___105__) /*106*/ {
    $(x___110__);
    throw $finalImplicit$1___112__;
  }
}
$(x___116__);
if ($implicitThrow$1___118__) {
  /*119*/ throw $finalCatchArg$1___121__;
} /*122*/ else {
  if ($finalStep___124__) {
    /*125*/ throw $finalArg___127__;
  } /*128*/ else {
    if ($finalStep$1___130__) {
      /*131*/ throw $finalArg$1___133__;
    } /*134*/ else {
      $(x___138__);
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 38,110      | none           | 42
  - r @38      | 4
  - w @42      | ########## | 56,67,110   | 4              | 60,71
  - r @56      | 42
  - w @60      | ########## | 67,85,110   | 42             | 71,89
  - r @67      | 42,60
  - w @71      | ########## | 110,116,138 | 42,60          | none
  - r @85      | 60
  - w @89      | ########## | 110,116,138 | 60             | none
  - r @110     | 4,42,60,71,89
  - r @116     | 71,89
  - r @138     | 71,89

$implicitThrow$1:
  - w @8             | ########## | 118         | none           | none
  - r @118           | 8

$finalStep:
  - w @12            | ########## | 124         | none           | 75
  - w @75            | ########## | 124         | 12             | none
  - r @124           | 12,75

$finalStep$1:
  - w @16            | ########## | 130         | none           | 96
  - w @96            | ########## | 130         | 16             | none
  - r @130           | 16,96

$finalCatchArg$1:
  - w @20            | ########## | 121         | none           | none
  - r @121           | 20

$finalArg:
  - w @24            | ########## | 127         | none           | 79
  - w @79            | ########## | 127         | 24             | none
  - r @127           | 24,79

$finalArg$1:
  - w @28            | ########## | 133         | none           | 100
  - w @100           | ########## | 133         | 28             | none
  - r @133           | 28,100

$implicitThrow:
  - w @45            | ########## | 91          | none           | none
  - r @91            | 45

$finalCatchArg:
  - w @49            | ########## | 99          | none           | none
  - r @99            | 49
