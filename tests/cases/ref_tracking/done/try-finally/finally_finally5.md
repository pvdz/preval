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
/* stmt(7): */ let /*___8__*/ x = 1;
/* stmt(10): */ let /*___11__*/ $implicitThrow$1 = false;
/* stmt(13): */ let /*___14__*/ $finalStep = false;
/* stmt(16): */ let /*___17__*/ $finalCatchArg$1 = /*___18__*/ undefined;
/* stmt(19): */ let /*___20__*/ $finalArg = /*___21__*/ undefined;
/* stmt(22): */ /*___23__*/ $finally$1: /*24~94*/ {
  /* stmt(25): */ try /*26~85*/ {
    /* stmt(29): */ let /*___30__*/ $implicitThrow = false;
    /* stmt(32): */ let /*___33__*/ $finalCatchArg = /*___34__*/ undefined;
    /* stmt(35): */ try /*36~48*/ {
      /* stmt(37): */ $(/*___40__*/ x);
      /* stmt(41): */ /*___44__*/ x = 2;
      /* stmt(45): */ $(/*___48__*/ x);
    } catch (/*___50__*/ $finalImplicit) /*51~59*/ {
      /* stmt(52): */ /*___55__*/ $implicitThrow = true;
      /* stmt(56): */ /*___59__*/ $finalCatchArg = /*___58__*/ $finalImplicit;
    }
    /* stmt(60): */ $(/*___63__*/ x);
    /* stmt(64): */ /*___67__*/ x = 3;
    /* stmt(68): */ $(/*___71__*/ x);
    /* stmt(72): */ if (/*___73__*/ $implicitThrow) {
      /*74~84*/ /* stmt(75): */ /*___78__*/ $finalStep = true;
      /* stmt(79): */ /*___82__*/ $finalArg = /*___81__*/ $finalCatchArg;
      /* stmt(83): */ break /*___84__*/ $finally$1;
    } /*85~85*/ else {
    }
  } catch (/*___87__*/ $finalImplicit$1) /*88~94*/ {
    /* stmt(89): */ $(/*___92__*/ x);
    /* stmt(93): */ throw /*___94__*/ $finalImplicit$1;
  }
}
/* stmt(95): */ $(/*___98__*/ x);
/* stmt(99): */ if (/*___100__*/ $implicitThrow$1) {
  /*101~103*/ /* stmt(102): */ throw /*___103__*/ $finalCatchArg$1;
} /*104~114*/ else {
  /* stmt(105): */ if (/*___106__*/ $finalStep) {
    /*107~109*/ /* stmt(108): */ throw /*___109__*/ $finalArg;
  } /*110~114*/ else {
    /* stmt(111): */ $(/*___114__*/ x);
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
