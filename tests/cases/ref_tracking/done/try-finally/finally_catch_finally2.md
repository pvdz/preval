# Preval test case

# finally_catch_finally2.md

> Ref tracking > Done > Try-finally > Finally catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x, 1);          // x=1
    x = 2;
    try {
      $(x, 2);        // x=2
      x = 3;
    } finally {
      $(x, 2, 3);     // x=2 3
      x = 4;
      $(x, 4);        // x=4
    }
  } catch {
    $(x, 1, 2, 3, 4); // x=1 2 3 4
    x = 5;
    $(x, 5);          // x=5
  }
} finally {
  $(x, 1,2,3,4,5);    // x=1 2 3 4 5
}
$(x, 5);              // x=4 5
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(5): */ let /*___6__*/ x = 1;
/* stmt(8): */ let /*___9__*/ $implicitThrow$1 = false;
/* stmt(11): */ let /*___12__*/ $finalCatchArg$1 = /*___13__*/ undefined;
/* stmt(14): */ try /*15~75*/ {
  /* stmt(18): */ $(/*___21__*/ x, 1);
  /* stmt(23): */ /*___26__*/ x = 2;
  /* stmt(27): */ let /*___28__*/ $implicitThrow = false;
  /* stmt(30): */ let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
  /* stmt(33): */ try /*34~43*/ {
    /* stmt(35): */ $(/*___38__*/ x, 2);
    /* stmt(40): */ /*___43__*/ x = 3;
  } catch (/*___45__*/ $finalImplicit) /*46~54*/ {
    /* stmt(47): */ /*___50__*/ $implicitThrow = true;
    /* stmt(51): */ /*___54__*/ $finalCatchArg = /*___53__*/ $finalImplicit;
  }
  /* stmt(55): */ $(/*___58__*/ x, 2, 3);
  /* stmt(61): */ /*___64__*/ x = 4;
  /* stmt(65): */ $(/*___68__*/ x, 4);
  /* stmt(70): */ if (/*___71__*/ $implicitThrow) {
    /*72~74*/ /* stmt(73): */ throw /*___74__*/ $finalCatchArg;
  } /*75~75*/ else {
  }
} catch (/*___77__*/ e) /*78~111*/ {
  /* stmt(79): */ try /*80~97*/ {
    /* stmt(81): */ $(/*___84__*/ x, 1, 2, 3, 4);
    /* stmt(89): */ /*___92__*/ x = 5;
    /* stmt(93): */ $(/*___96__*/ x, 5);
  } catch (/*___99__*/ $finalImplicit$1) /*100~111*/ {
    /* stmt(101): */ $(/*___104__*/ x, 1, 2, 3, 4, 5);
    /* stmt(110): */ throw /*___111__*/ $finalImplicit$1;
  }
}
/* stmt(112): */ $(/*___115__*/ x, 1, 2, 3, 4, 5);
/* stmt(121): */ if (/*___122__*/ $implicitThrow$1) {
  /*123~125*/ /* stmt(124): */ throw /*___125__*/ $finalCatchArg$1;
} /*126~131*/ else {
  /* stmt(127): */ $(/*___130__*/ x, 5);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 21,84,104   | none           | 26,92
  - r @21      | 6
  - w @26      | ########## | 38,58,84,104 | 6              | 43,64,92
  - r @38      | 26
  - w @43      | ########## | 58,84,104   | 26             | 64,92
  - r @58      | 26,43
  - w @64      | ########## | 68,84,104,115,130 | 26,43          | 92
  - r @68      | 64
  - r @84      | 6,26,43,64
  - w @92      | ########## | 96,104,115,130 | 6,26,43,64     | none
  - r @96      | 92
  - r @104     | 6,26,43,64,92
  - r @115     | 64,92
  - r @130     | 64,92

$implicitThrow$1:
  - w @9             | ########## | 122         | none           | none
  - r @122           | 9

$finalCatchArg$1:
  - w @12            | ########## | 125         | none           | none
  - r @125           | 12

$implicitThrow:
  - w @28            | ########## | 71          | none           | 50
  - w @50            | ########## | 71          | 28             | none
  - r @71            | 28,50

$finalCatchArg:
  - w @31            | ########## | 74          | none           | 54
  - w @54            | ########## | 74          | 31             | none
  - r @74            | 31,54

$finalImplicit:
  - w @45            | ########## | 53          | none           | none
  - r @53            | 45

e:
  - w @77            | ########## | not read    | none           | none

$finalImplicit$1:
  - w @99            | ########## | 111         | none           | none
  - r @111           | 99
