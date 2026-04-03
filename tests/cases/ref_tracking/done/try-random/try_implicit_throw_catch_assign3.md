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
/* stmt(9): */ let /*___10__*/ x = 1;
/* stmt(12): */ $(/*___15__*/ x);
/* stmt(16): */ let /*___17__*/ $implicitThrow$1 = false;
/* stmt(19): */ let /*___20__*/ $finalStep = false;
/* stmt(22): */ let /*___23__*/ $finalStep$1 = false;
/* stmt(25): */ let /*___26__*/ $finalCatchArg$1 = /*___27__*/ undefined;
/* stmt(28): */ let /*___29__*/ $finalArg = /*___30__*/ undefined;
/* stmt(31): */ let /*___32__*/ $finalArg$1 = /*___33__*/ undefined;
/* stmt(34): */ /*___35__*/ $finally$1: /*36~104*/ {
  /* stmt(37): */ try /*38~95*/ {
    /* stmt(41): */ let /*___42__*/ $implicitThrow = false;
    /* stmt(44): */ let /*___45__*/ $finalCatchArg = /*___46__*/ undefined;
    /* stmt(47): */ try /*48~56*/ {
      /* stmt(49): */ $(/*___52__*/ x);
      /* stmt(53): */ /*___56__*/ x = 2;
    } catch (/*___58__*/ $finalImplicit) /*59~73*/ {
      /* stmt(60): */ $(/*___63__*/ x);
      /* stmt(64): */ /*___67__*/ $finalStep = true;
      /* stmt(68): */ /*___71__*/ $finalArg = /*___70__*/ $finalImplicit;
      /* stmt(72): */ break /*___73__*/ $finally$1;
    }
    /* stmt(74): */ $(/*___77__*/ x);
    /* stmt(78): */ if (/*___79__*/ $implicitThrow) {
      /*80~90*/ /* stmt(81): */ /*___84__*/ $finalStep$1 = true;
      /* stmt(85): */ /*___88__*/ $finalArg$1 = /*___87__*/ $finalCatchArg;
      /* stmt(89): */ break /*___90__*/ $finally$1;
    } /*91~95*/ else {
      /* stmt(92): */ $(/*___95__*/ x);
    }
  } catch (/*___97__*/ $finalImplicit$1) /*98~104*/ {
    /* stmt(99): */ $(/*___102__*/ x);
    /* stmt(103): */ throw /*___104__*/ $finalImplicit$1;
  }
}
/* stmt(105): */ $(/*___108__*/ x);
/* stmt(109): */ if (/*___110__*/ $implicitThrow$1) {
  /*111~113*/ /* stmt(112): */ throw /*___113__*/ $finalCatchArg$1;
} /*114~130*/ else {
  /* stmt(115): */ if (/*___116__*/ $finalStep) {
    /*117~119*/ /* stmt(118): */ throw /*___119__*/ $finalArg;
  } /*120~130*/ else {
    /* stmt(121): */ if (/*___122__*/ $finalStep$1) {
      /*123~125*/ /* stmt(124): */ throw /*___125__*/ $finalArg$1;
    } /*126~130*/ else {
      /* stmt(127): */ $(/*___130__*/ x);
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
