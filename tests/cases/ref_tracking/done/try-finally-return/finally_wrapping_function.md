# Preval test case

# finally_wrapping_function.md

> Ref tracking > Done > Try-finally-return > Finally wrapping function

## Options

- refTest

## Input

`````js filename=intro
try {
  
} finally {
  function f() {
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x); // can see 1 2
    }
  }
  $(f);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___6__*/ $implicitThrow$1 = false;
let /*___9__*/ $finalCatchArg$1 = /*___10__*/ undefined;
let /*___12__*/ f = function () /*14*/ {
    debugger;
    let /*___22__*/ x = 1;
    let /*___25__*/ $implicitThrow = false;
    let /*___28__*/ $finalStep = false;
    let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
    let /*___34__*/ $finalArg = /*___35__*/ undefined;
    /*___37__*/ $finally: /*38~72*/ {
      try /*40~63*/ {
        const /*___43__*/ tmpIfTest = $();
        if (/*___47__*/ tmpIfTest) {
          /*48~62*/ /*___52__*/ x = 2;
          /*___56__*/ $finalStep = true;
          /*___60__*/ $finalArg = 100;
          break /*___62__*/ $finally;
        } /*63~63*/ else {
        }
      } catch (/*___65__*/ $finalImplicit) /*66~72*/ {
        $(/*___70__*/ x);
        throw /*___72__*/ $finalImplicit;
      }
    }
    $(/*___76__*/ x);
    if (/*___78__*/ $implicitThrow) {
      /*79~81*/ throw /*___81__*/ $finalCatchArg;
    } /*82~91*/ else {
      if (/*___84__*/ $finalStep) {
        /*85~88*/ return /*___88__*/ $finalArg;
      } /*89~91*/ else {
        return /*___91__*/ undefined;
      }
    }
  };
$(/*___95__*/ f);
if (/*___97__*/ $implicitThrow$1) {
  /*98~100*/ throw /*___100__*/ $finalCatchArg$1;
} /*101~101*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
$implicitThrow$1:
  - w @6             | ########## | 97          | none           | none
  - r @97            | 6

$finalCatchArg$1:
  - w @9             | ########## | 100         | none           | none
  - r @100           | 9

f:
  - w @12            | ########## | 95          | none           | none
  - r @95            | 12

x:
  - w @22            | ########## | 70,76       | none           | 52
  - w @52            | ########## | 70,76       | 22             | none
  - r @70            | 22,52
  - r @76            | 22,52

$implicitThrow:
  - w @25            | ########## | 78          | none           | none
  - r @78            | 25

$finalStep:
  - w @28            | ########## | 84          | none           | 56
  - w @56            | ########## | 84          | 28             | none
  - r @84            | 28,56

$finalCatchArg:
  - w @31            | ########## | 81          | none           | none
  - r @81            | 31

$finalArg:
  - w @34            | ########## | 88          | none           | 60
  - w @60            | ########## | 88          | 34             | none
  - r @88            | 34,60

tmpIfTest:
  - w @43            | ########## | 47          | none           | none
  - r @47            | 43

$finalImplicit:
  - w @65            | ########## | 72          | none           | none
  - r @72            | 65
