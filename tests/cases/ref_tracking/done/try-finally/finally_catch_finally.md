# Preval test case

# finally_catch_finally.md

> Ref tracking > Done > Try-finally > Finally catch finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
} finally {
  $(x);       // x=1 2 3 4 5
}
$(x);         // x=4 5
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(5): */ let /*___6__*/ x = 1;
/* stmt(8): */ let /*___9__*/ $implicitThrow$1 = false;
/* stmt(11): */ let /*___12__*/ $finalCatchArg$1 = /*___13__*/ undefined;
/* stmt(14): */ try /*15~68*/ {
  /* stmt(18): */ $(/*___21__*/ x);
  /* stmt(22): */ /*___25__*/ x = 2;
  /* stmt(26): */ let /*___27__*/ $implicitThrow = false;
  /* stmt(29): */ let /*___30__*/ $finalCatchArg = /*___31__*/ undefined;
  /* stmt(32): */ try /*33~41*/ {
    /* stmt(34): */ $(/*___37__*/ x);
    /* stmt(38): */ /*___41__*/ x = 3;
  } catch (/*___43__*/ $finalImplicit) /*44~54*/ {
    /* stmt(45): */ $(/*___48__*/ x);
    /* stmt(49): */ /*___52__*/ x = 4;
    /* stmt(53): */ throw /*___54__*/ $finalImplicit;
  }
  /* stmt(55): */ $(/*___58__*/ x);
  /* stmt(59): */ /*___62__*/ x = 4;
  /* stmt(63): */ if (/*___64__*/ $implicitThrow) {
    /*65~67*/ /* stmt(66): */ throw /*___67__*/ $finalCatchArg;
  } /*68~68*/ else {
  }
} catch (/*___70__*/ e) /*71~90*/ {
  /* stmt(72): */ try /*73~81*/ {
    /* stmt(74): */ $(/*___77__*/ x);
    /* stmt(78): */ /*___81__*/ x = 5;
  } catch (/*___83__*/ $finalImplicit$1) /*84~90*/ {
    /* stmt(85): */ $(/*___88__*/ x);
    /* stmt(89): */ throw /*___90__*/ $finalImplicit$1;
  }
}
/* stmt(91): */ $(/*___94__*/ x);
/* stmt(95): */ if (/*___96__*/ $implicitThrow$1) {
  /*97~99*/ /* stmt(98): */ throw /*___99__*/ $finalCatchArg$1;
} /*100~104*/ else {
  /* stmt(101): */ $(/*___104__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 21,77,88    | none           | 25,81
  - r @21      | 6
  - w @25      | ########## | 37,48,77,88 | 6              | 41,52,81
  - r @37      | 25
  - w @41      | ########## | 48,58,77,88 | 25             | 52,62,81
  - r @48      | 25,41
  - w @52      | ########## | 77,88       | 25,41          | 81
  - r @58      | 41
  - w @62      | ########## | 77,88,94,104 | 41             | 81
  - r @77      | 6,25,41,52,62
  - w @81      | ########## | 88,94,104   | 6,25,41,52,62  | none
  - r @88      | 6,25,41,52,62,81
  - r @94      | 62,81
  - r @104     | 62,81

$implicitThrow$1:
  - w @9             | ########## | 96          | none           | none
  - r @96            | 9

$finalCatchArg$1:
  - w @12            | ########## | 99          | none           | none
  - r @99            | 12

$implicitThrow:
  - w @27            | ########## | 64          | none           | none
  - r @64            | 27

$finalCatchArg:
  - w @30            | ########## | 67          | none           | none
  - r @67            | 30

$finalImplicit:
  - w @43            | ########## | 54          | none           | none
  - r @54            | 43

e:
  - w @70            | ########## | not read    | none           | none

$finalImplicit$1:
  - w @83            | ########## | 90          | none           | none
  - r @90            | 83
