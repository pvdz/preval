# Preval test case

# finally_finally6.md

> Ref tracking > Done > Try-finally > Finally finally6

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    x = 2;
  } finally {
    x = 3;
  }
} finally {
  $(x);       // x=1 2 3
}
$(x);         // x=3
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
    let $implicitThrow___37__ = false;
    let $finalCatchArg___41__ = undefined___42__;
    try /*44*/ {
      x___48__ = 2;
    } catch ($finalImplicit___50__) /*51*/ {
      x___55__ = 3;
      $finalStep___59__ = true;
      $finalArg___63__ = $finalImplicit___62__;
      break $finally$1___65__;
    }
    x___69__ = 3;
    if ($implicitThrow___71__) {
      /*72*/ $finalStep$1___76__ = true;
      $finalArg$1___80__ = $finalCatchArg___79__;
      break $finally$1___82__;
    } /*83*/ else {
    }
  } catch ($finalImplicit$1___85__) /*86*/ {
    $(x___90__);
    throw $finalImplicit$1___92__;
  }
}
$(x___96__);
if ($implicitThrow$1___98__) {
  /*99*/ throw $finalCatchArg$1___101__;
} /*102*/ else {
  if ($finalStep___104__) {
    /*105*/ throw $finalArg___107__;
  } /*108*/ else {
    if ($finalStep$1___110__) {
      /*111*/ throw $finalArg$1___113__;
    } /*114*/ else {
      $(x___118__);
    }
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 90          | none           | 48,55
  - w @48      | ########## | 90          | 4              | 55,69
  - w @55      | ########## | 90,96,118   | 4,48           | none
  - w @69      | ########## | 90,96,118   | 48             | none
  - r @90      | 4,48,55,69
  - r @96      | 55,69
  - r @118     | 55,69

$implicitThrow$1:
  - w @8             | ########## | 98          | none           | none
  - r @98            | 8

$finalStep:
  - w @12            | ########## | 104         | none           | 59
  - w @59            | ########## | 104         | 12             | none
  - r @104           | 12,59

$finalStep$1:
  - w @16            | ########## | 110         | none           | 76
  - w @76            | ########## | 110         | 16             | none
  - r @110           | 16,76

$finalCatchArg$1:
  - w @20            | ########## | 101         | none           | none
  - r @101           | 20

$finalArg:
  - w @24            | ########## | 107         | none           | 63
  - w @63            | ########## | 107         | 24             | none
  - r @107           | 24,63

$finalArg$1:
  - w @28            | ########## | 113         | none           | 80
  - w @80            | ########## | 113         | 28             | none
  - r @113           | 28,80

$implicitThrow:
  - w @37            | ########## | 71          | none           | none
  - r @71            | 37

$finalCatchArg:
  - w @41            | ########## | 79          | none           | none
  - r @79            | 41
