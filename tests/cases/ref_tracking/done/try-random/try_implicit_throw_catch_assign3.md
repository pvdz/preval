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
let /*___10__*/ x = 1;
$(/*___15__*/ x);
let /*___17__*/ $implicitThrow$1 = false;
let /*___20__*/ $finalStep = false;
let /*___23__*/ $finalStep$1 = false;
let /*___26__*/ $finalCatchArg$1 = /*___27__*/ undefined;
let /*___29__*/ $finalArg = /*___30__*/ undefined;
let /*___32__*/ $finalArg$1 = /*___33__*/ undefined;
/*___35__*/ $finally$1: /*36~104*/ {
  try /*38~95*/ {
    let /*___42__*/ $implicitThrow = false;
    let /*___45__*/ $finalCatchArg = /*___46__*/ undefined;
    try /*48~56*/ {
      $(/*___52__*/ x);
      /*___56__*/ x = 2;
    } catch (/*___58__*/ $finalImplicit) /*59~73*/ {
      $(/*___63__*/ x);
      /*___67__*/ $finalStep = true;
      /*___71__*/ $finalArg = /*___70__*/ $finalImplicit;
      break /*___73__*/ $finally$1;
    }
    $(/*___77__*/ x);
    if (/*___79__*/ $implicitThrow) {
      /*80~90*/ /*___84__*/ $finalStep$1 = true;
      /*___88__*/ $finalArg$1 = /*___87__*/ $finalCatchArg;
      break /*___90__*/ $finally$1;
    } /*91~95*/ else {
      $(/*___95__*/ x);
    }
  } catch (/*___97__*/ $finalImplicit$1) /*98~104*/ {
    $(/*___102__*/ x);
    throw /*___104__*/ $finalImplicit$1;
  }
}
$(/*___108__*/ x);
if (/*___110__*/ $implicitThrow$1) {
  /*111~113*/ throw /*___113__*/ $finalCatchArg$1;
} /*114~130*/ else {
  if (/*___116__*/ $finalStep) {
    /*117~119*/ throw /*___119__*/ $finalArg;
  } /*120~130*/ else {
    if (/*___122__*/ $finalStep$1) {
      /*123~125*/ throw /*___125__*/ $finalArg$1;
    } /*126~130*/ else {
      $(/*___130__*/ x);
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
