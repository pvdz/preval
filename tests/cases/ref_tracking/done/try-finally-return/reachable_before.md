# Preval test case

# reachable_before.md

> Ref tracking > Done > Try-finally-return > Reachable before

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    if ($()) {
      return;
    }
    x = 2;
  } finally {
    $(x); // 1 or 2
  }
}
$(f);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___14__*/ x = 1;
    let /*___17__*/ $implicitThrow = false;
    let /*___20__*/ $finalStep = false;
    let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
    let /*___26__*/ $finalArg = /*___27__*/ undefined;
    /*___29__*/ $finally: /*30~64*/ {
      try /*32~55*/ {
        const /*___35__*/ tmpIfTest = $();
        if (/*___39__*/ tmpIfTest) {
          /*40~50*/ /*___44__*/ $finalStep = true;
          /*___48__*/ $finalArg = /*___47__*/ undefined;
          break /*___50__*/ $finally;
        } /*51~55*/ else {
          /*___55__*/ x = 2;
        }
      } catch (/*___57__*/ $finalImplicit) /*58~64*/ {
        $(/*___62__*/ x);
        throw /*___64__*/ $finalImplicit;
      }
    }
    $(/*___68__*/ x);
    if (/*___70__*/ $implicitThrow) {
      /*71~73*/ throw /*___73__*/ $finalCatchArg;
    } /*74~83*/ else {
      if (/*___76__*/ $finalStep) {
        /*77~80*/ return /*___80__*/ $finalArg;
      } /*81~83*/ else {
        return /*___83__*/ undefined;
      }
    }
  };
$(/*___87__*/ f);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 87          | none           | none
  - r @87      | 4

x:
  - w @14      | ########## | 62,68       | none           | 55
  - w @55      | ########## | 62,68       | 14             | none
  - r @62      | 14,55
  - r @68      | 14,55

$implicitThrow:
  - w @17          | ########## | 70          | none           | none
  - r @70          | 17

$finalStep:
  - w @20          | ########## | 76          | none           | 44
  - w @44          | ########## | 76          | 20             | none
  - r @76          | 20,44

$finalCatchArg:
  - w @23          | ########## | 73          | none           | none
  - r @73          | 23

$finalArg:
  - w @26          | ########## | 80          | none           | 48
  - w @48          | ########## | 80          | 26             | none
  - r @80          | 26,48

tmpIfTest:
  - w @35          | ########## | 39          | none           | none
  - r @39          | 35

$finalImplicit:
  - w @57          | ########## | 64          | none           | none
  - r @64          | 57
