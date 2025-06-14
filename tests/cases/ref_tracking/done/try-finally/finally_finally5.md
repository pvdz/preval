# Preval test case

# finally_finally5.md

> Ref tracking > Done > Try-finally > Finally finally5

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x);     // x=1
    x = 2;
    $(x);     // x=2
  } finally {
    $(x);     // x=1 2
    x = 3;
    $(x);     // x=3
  }
} finally {
  $(x);       // x=1 2 3
}
$(x);         // x=3
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___8__*/ x = 1;
let /*___11__*/ $implicitThrow$1 = false;
let /*___14__*/ $finalStep = false;
let /*___17__*/ $finalCatchArg$1 = /*___18__*/ undefined;
let /*___20__*/ $finalArg = /*___21__*/ undefined;
/*___23__*/ $finally$1: /*24~94*/ {
  try /*26~85*/ {
    let /*___30__*/ $implicitThrow = false;
    let /*___33__*/ $finalCatchArg = /*___34__*/ undefined;
    try /*36~48*/ {
      $(/*___40__*/ x);
      /*___44__*/ x = 2;
      $(/*___48__*/ x);
    } catch (/*___50__*/ $finalImplicit) /*51~59*/ {
      /*___55__*/ $implicitThrow = true;
      /*___59__*/ $finalCatchArg = /*___58__*/ $finalImplicit;
    }
    $(/*___63__*/ x);
    /*___67__*/ x = 3;
    $(/*___71__*/ x);
    if (/*___73__*/ $implicitThrow) {
      /*74~84*/ /*___78__*/ $finalStep = true;
      /*___82__*/ $finalArg = /*___81__*/ $finalCatchArg;
      break /*___84__*/ $finally$1;
    } /*85~85*/ else {
    }
  } catch (/*___87__*/ $finalImplicit$1) /*88~94*/ {
    $(/*___92__*/ x);
    throw /*___94__*/ $finalImplicit$1;
  }
}
$(/*___98__*/ x);
if (/*___100__*/ $implicitThrow$1) {
  /*101~103*/ throw /*___103__*/ $finalCatchArg$1;
} /*104~114*/ else {
  if (/*___106__*/ $finalStep) {
    /*107~109*/ throw /*___109__*/ $finalArg;
  } /*110~114*/ else {
    $(/*___114__*/ x);
  }
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | 40,63,92    | none           | 44,67
  - r @40      | 8
  - w @44      | ########## | 48,63,92    | 8              | 67
  - r @48      | 44
  - r @63      | 8,44
  - w @67      | ########## | 71,92,98,114 | 8,44           | none
  - r @71      | 67
  - r @92      | 8,44,67
  - r @98      | 67
  - r @114     | 67

$implicitThrow$1:
  - w @11            | ########## | 100         | none           | none
  - r @100           | 11

$finalStep:
  - w @14            | ########## | 106         | none           | 78
  - w @78            | ########## | 106         | 14             | none
  - r @106           | 14,78

$finalCatchArg$1:
  - w @17            | ########## | 103         | none           | none
  - r @103           | 17

$finalArg:
  - w @20            | ########## | 109         | none           | 82
  - w @82            | ########## | 109         | 20             | none
  - r @109           | 20,82

$implicitThrow:
  - w @30            | ########## | 73          | none           | 55
  - w @55            | ########## | 73          | 30             | none
  - r @73            | 30,55

$finalCatchArg:
  - w @33            | ########## | 81          | none           | 59
  - w @59            | ########## | 81          | 33             | none
  - r @81            | 33,59

$finalImplicit:
  - w @50            | ########## | 58          | none           | none
  - r @58            | 50

$finalImplicit$1:
  - w @87            | ########## | 94          | none           | none
  - r @94            | 87
