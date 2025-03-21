# Preval test case

# try_implicit_throw_caught.md

> Ref tracking > Done > Try-random > Try implicit throw caught
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  try {
    try {
      $(x);   // x=1
      x = 2;
    } finally {
      $(x);   // x=1 2
    }
    $(x);     // x=2. Cannot be 1 because that's only possible under a throw.
  } catch {
    $(x);     // x=1 2
  } finally {
    $(x);     // x=1 2
  }
  $(x);       // x=1 2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
let $implicitThrow$1___12__ = false;
let $finalStep___16__ = false;
let $finalStep$1___20__ = false;
let $finalCatchArg$1___24__ = undefined___25__;
let $finalArg___28__ = undefined___29__;
let $finalArg$1___32__ = undefined___33__;
$finally$1___35__: /*36*/ {
  try /*38*/ {
    let $implicitThrow___41__ = false;
    let $finalCatchArg___45__ = undefined___46__;
    try /*48*/ {
      $(x___52__);
      x___56__ = 2;
    } catch ($finalImplicit___58__) /*59*/ {
      $(x___63__);
      $finalStep___67__ = true;
      $finalArg___71__ = $finalImplicit___70__;
      break $finally$1___73__;
    }
    $(x___77__);
    if ($implicitThrow___79__) {
      /*80*/ $finalStep$1___84__ = true;
      $finalArg$1___88__ = $finalCatchArg___87__;
      break $finally$1___90__;
    } /*91*/ else {
      $(x___95__);
    }
  } catch ($finalImplicit$1___97__) /*98*/ {
    $(x___102__);
    throw $finalImplicit$1___104__;
  }
}
$(x___108__);
if ($implicitThrow$1___110__) {
  /*111*/ throw $finalCatchArg$1___113__;
} /*114*/ else {
  if ($finalStep___116__) {
    /*117*/ throw $finalArg___119__;
  } /*120*/ else {
    if ($finalStep$1___122__) {
      /*123*/ throw $finalArg$1___125__;
    } /*126*/ else {
      $(x___130__);
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,52,63,102,108,130 | none           | 56
  - r @9       | 4
  - r @52      | 4
  - w @56      | ########## | 63,77,95,102,108,130 | 4              | none
  - r @63      | 4,56
  - r @77      | 56
  - r @95      | 56
  - r @102     | 4,56
  - r @108     | 4,56
  - r @130     | 4,56

$implicitThrow$1:
  - w @12            | ########## | 110         | none           | none
  - r @110           | 12

$finalStep:
  - w @16            | ########## | 116         | none           | 67
  - w @67            | ########## | 116         | 16             | none
  - r @116           | 16,67

$finalStep$1:
  - w @20            | ########## | 122         | none           | 84
  - w @84            | ########## | 122         | 20             | none
  - r @122           | 20,84

$finalCatchArg$1:
  - w @24            | ########## | 113         | none           | none
  - r @113           | 24

$finalArg:
  - w @28            | ########## | 119         | none           | 71
  - w @71            | ########## | 119         | 28             | none
  - r @119           | 28,71

$finalArg$1:
  - w @32            | ########## | 125         | none           | 88
  - w @88            | ########## | 125         | 32             | none
  - r @125           | 32,88

$implicitThrow:
  - w @41            | ########## | 79          | none           | none
  - r @79            | 41

$finalCatchArg:
  - w @45            | ########## | 87          | none           | none
  - r @87            | 45
