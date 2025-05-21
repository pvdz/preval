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
let x___10__ = 1;
$(x___15__);
let $implicitThrow$1___17__ = false;
let $finalStep___20__ = false;
let $finalStep$1___23__ = false;
let $finalCatchArg$1___26__ = undefined___27__;
let $finalArg___29__ = undefined___30__;
let $finalArg$1___32__ = undefined___33__;
$finally$1___35__: /*36*/ {
  try /*38*/ {
    let $implicitThrow___42__ = false;
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
  - w @10      | ########## | 15,52,63,102,108,130 | none           | 56
  - r @15      | 10
  - r @52      | 10
  - w @56      | ########## | 63,77,95,102,108,130 | 10             | none
  - r @63      | 10,56
  - r @77      | 56
  - r @95      | 56
  - r @102     | 10,56
  - r @108     | 10,56
  - r @130     | 10,56

$implicitThrow$1:
  - w @17            | ########## | 110         | none           | none
  - r @110           | 17

$finalStep:
  - w @20            | ########## | 116         | none           | 67
  - w @67            | ########## | 116         | 20             | none
  - r @116           | 20,67

$finalStep$1:
  - w @23            | ########## | 122         | none           | 84
  - w @84            | ########## | 122         | 23             | none
  - r @122           | 23,84

$finalCatchArg$1:
  - w @26            | ########## | 113         | none           | none
  - r @113           | 26

$finalArg:
  - w @29            | ########## | 119         | none           | 71
  - w @71            | ########## | 119         | 29             | none
  - r @119           | 29,71

$finalArg$1:
  - w @32            | ########## | 125         | none           | 88
  - w @88            | ########## | 125         | 32             | none
  - r @125           | 32,88

$implicitThrow:
  - w @42            | ########## | 79          | none           | none
  - r @79            | 42

$finalCatchArg:
  - w @45            | ########## | 87          | none           | none
  - r @87            | 45

$finalImplicit:
  - w @58            | ########## | 70          | none           | none
  - r @70            | 58

$finalImplicit$1:
  - w @97            | ########## | 104         | none           | none
  - r @104           | 97
