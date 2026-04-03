# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally-return > Try finally

## Options

- refTest

## Input

`````js filename=intro
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
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___14__*/ x = 1;
    let /*___17__*/ $implicitThrow = false;
    let /*___20__*/ $finalStep = false;
    let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
    let /*___26__*/ $finalArg = /*___27__*/ undefined;
    /*___29__*/ $finally: /*30~64*/ {
      /* stmt(31): */ try /*32~55*/ {
        /* stmt(34): */ const /*___35__*/ tmpIfTest = $();
        /* stmt(38): */ if (/*___39__*/ tmpIfTest) {
          /*40~54*/ /* stmt(41): */ /*___44__*/ x = 2;
          /* stmt(45): */ /*___48__*/ $finalStep = true;
          /* stmt(49): */ /*___52__*/ $finalArg = 100;
          /* stmt(53): */ break /*___54__*/ $finally;
        } /*55~55*/ else {
        }
      } catch (/*___57__*/ $finalImplicit) /*58~64*/ {
        /* stmt(59): */ $(/*___62__*/ x);
        /* stmt(63): */ throw /*___64__*/ $finalImplicit;
      }
    }
    $(/*___68__*/ x);
    if (/*___70__*/ $implicitThrow) {
      /*71~73*/ /* stmt(72): */ throw /*___73__*/ $finalCatchArg;
    } /*74~83*/ else {
      /* stmt(75): */ if (/*___76__*/ $finalStep) {
        /*77~80*/ /* stmt(78): */ return /*___80__*/ $finalArg;
      } /*81~83*/ else {
        /* stmt(82): */ return /*___83__*/ undefined;
      }
    }
  };
/* stmt(84): */ $(/*___87__*/ f);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 87          | none           | none
  - r @87      | 4

x:
  - w @14      | ########## | 62,68       | none           | 44
  - w @44      | ########## | 62,68       | 14             | none
  - r @62      | 14,44
  - r @68      | 14,44

$implicitThrow:
  - w @17          | ########## | 70          | none           | none
  - r @70          | 17

$finalStep:
  - w @20          | ########## | 76          | none           | 48
  - w @48          | ########## | 76          | 20             | none
  - r @76          | 20,48

$finalCatchArg:
  - w @23          | ########## | 73          | none           | none
  - r @73          | 23

$finalArg:
  - w @26          | ########## | 80          | none           | 52
  - w @52          | ########## | 80          | 26             | none
  - r @80          | 26,52

tmpIfTest:
  - w @35          | ########## | 39          | none           | none
  - r @39          | 35

$finalImplicit:
  - w @57          | ########## | 64          | none           | none
  - r @64          | 57
