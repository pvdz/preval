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
let /*___6__*/ x = 1;
let /*___9__*/ $implicitThrow$1 = false;
let /*___12__*/ $finalCatchArg$1 = /*___13__*/ undefined;
try /*15~75*/ {
  $(/*___21__*/ x, 1);
  /*___26__*/ x = 2;
  let /*___28__*/ $implicitThrow = false;
  let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
  try /*34~43*/ {
    $(/*___38__*/ x, 2);
    /*___43__*/ x = 3;
  } catch (/*___45__*/ $finalImplicit) /*46~54*/ {
    /*___50__*/ $implicitThrow = true;
    /*___54__*/ $finalCatchArg = /*___53__*/ $finalImplicit;
  }
  $(/*___58__*/ x, 2, 3);
  /*___64__*/ x = 4;
  $(/*___68__*/ x, 4);
  if (/*___71__*/ $implicitThrow) {
    /*72~74*/ throw /*___74__*/ $finalCatchArg;
  } /*75~75*/ else {
  }
} catch (/*___77__*/ e) /*78~111*/ {
  try /*80~97*/ {
    $(/*___84__*/ x, 1, 2, 3, 4);
    /*___92__*/ x = 5;
    $(/*___96__*/ x, 5);
  } catch (/*___99__*/ $finalImplicit$1) /*100~111*/ {
    $(/*___104__*/ x, 1, 2, 3, 4, 5);
    throw /*___111__*/ $finalImplicit$1;
  }
}
$(/*___115__*/ x, 1, 2, 3, 4, 5);
if (/*___122__*/ $implicitThrow$1) {
  /*123~125*/ throw /*___125__*/ $finalCatchArg$1;
} /*126~131*/ else {
  $(/*___130__*/ x, 5);
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
