# Preval test case

# try_implicit_throw_catch_assign3.md

> Ref tracking > Done > Try-random > Try implicit throw catch assign3
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);        // x=1
  try {
    try {
      $(x);    // x=1
      x = 2;
    } finally {
      $(x);    // x=1 2
    }
    $(x);      // x=2. Cannot be 1 because that's only possible under a throw.
  } finally {
    $(x);      // x=1 2
  }
  $(x);        // x=2. because 1 would continue as a throw after the outer finally
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
let $implicitThrow$1___12__ = false;
let $finalStep___16__ = false;
let $finalCatchArg$1___20__ = undefined___21__;
let $finalArg___24__ = undefined___25__;
$finally$1___27__: /*28*/ {
  try /*30*/ {
    let $implicitThrow___33__ = false;
    let $finalCatchArg___37__ = undefined___38__;
    try /*40*/ {
      $(x___44__);
      x___48__ = 2;
    } catch ($finalImplicit___50__) /*51*/ {
      $implicitThrow___55__ = true;
      $finalCatchArg___59__ = $finalImplicit___58__;
    }
    $(x___63__);
    if ($implicitThrow___65__) {
      /*66*/ $finalStep___70__ = true;
      $finalArg___74__ = $finalCatchArg___73__;
      break $finally$1___76__;
    } /*77*/ else {
      $(x___81__);
    }
  } catch ($finalImplicit$1___83__) /*84*/ {
    $implicitThrow$1___88__ = true;
    $finalCatchArg$1___92__ = $finalImplicit$1___91__;
  }
}
$(x___96__);
if ($implicitThrow$1___98__) {
  /*99*/ throw $finalCatchArg$1___101__;
} /*102*/ else {
  if ($finalStep___104__) {
    /*105*/ throw $finalArg___107__;
  } /*108*/ else {
    $(x___112__);
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,44,63,81,96,112 | none           | 48
  - r @9       | 4
  - r @44      | 4
  - w @48      | ########## | 63,81,96,112 | 4              | none
  - r @63      | 4,48
  - r @81      | 4,48
  - r @96      | 4,48
  - r @112     | 4,48

$implicitThrow$1:
  - w @12            | ########## | 98          | none           | 88
  - w @88            | ########## | 98          | 12             | none
  - r @98            | 12,88

$finalStep:
  - w @16            | ########## | 104         | none           | 70
  - w @70            | ########## | 104         | 16             | none
  - r @104           | 16,70

$finalCatchArg$1:
  - w @20            | ########## | 101         | none           | 92
  - w @92            | ########## | 101         | 20             | none
  - r @101           | 20,92

$finalArg:
  - w @24            | ########## | 107         | none           | 74
  - w @74            | ########## | 107         | 24             | none
  - r @107           | 24,74

$implicitThrow:
  - w @33            | ########## | 65          | none           | 55
  - w @55            | ########## | 65          | 33             | none
  - r @65            | 33,55

$finalCatchArg:
  - w @37            | ########## | 73          | none           | 59
  - w @59            | ########## | 73          | 37             | none
  - r @73            | 37,59
