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
let x___10__ = 1;
let $implicitThrow$1___13__ = false;
let $finalStep___16__ = false;
let $finalStep$1___19__ = false;
let $finalCatchArg$1___22__ = undefined___23__;
let $finalArg___25__ = undefined___26__;
let $finalArg$1___28__ = undefined___29__;
$finally$1___31__: /*32*/ {
  try /*34*/ {
    let $implicitThrow___38__ = false;
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


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @10      | ########## | 90          | none           | 48,55
  - w @48      | ########## | 90          | 10             | 55,69
  - w @55      | ########## | 90,96,118   | 10,48          | none
  - w @69      | ########## | 90,96,118   | 48             | none
  - r @90      | 10,48,55,69
  - r @96      | 55,69
  - r @118     | 55,69

$implicitThrow$1:
  - w @13            | ########## | 98          | none           | none
  - r @98            | 13

$finalStep:
  - w @16            | ########## | 104         | none           | 59
  - w @59            | ########## | 104         | 16             | none
  - r @104           | 16,59

$finalStep$1:
  - w @19            | ########## | 110         | none           | 76
  - w @76            | ########## | 110         | 19             | none
  - r @110           | 19,76

$finalCatchArg$1:
  - w @22            | ########## | 101         | none           | none
  - r @101           | 22

$finalArg:
  - w @25            | ########## | 107         | none           | 63
  - w @63            | ########## | 107         | 25             | none
  - r @107           | 25,63

$finalArg$1:
  - w @28            | ########## | 113         | none           | 80
  - w @80            | ########## | 113         | 28             | none
  - r @113           | 28,80

$implicitThrow:
  - w @38            | ########## | 71          | none           | none
  - r @71            | 38

$finalCatchArg:
  - w @41            | ########## | 79          | none           | none
  - r @79            | 41

$finalImplicit:
  - w @50            | ########## | 62          | none           | none
  - r @62            | 50

$finalImplicit$1:
  - w @85            | ########## | 92          | none           | none
  - r @92            | 85
