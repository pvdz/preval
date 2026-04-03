# Preval test case

# finally_finally6.md

> Ref tracking > Done > Try-finally > Finally finally6

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    x = 2;
  } finally {
    x = 3;
  }
} finally {
  $(x);       // x=1 2 3
}
$(x);         // x=3
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(9): */ let /*___10__*/ x = 1;
/* stmt(12): */ let /*___13__*/ $implicitThrow$1 = false;
/* stmt(15): */ let /*___16__*/ $finalStep = false;
/* stmt(18): */ let /*___19__*/ $finalStep$1 = false;
/* stmt(21): */ let /*___22__*/ $finalCatchArg$1 = /*___23__*/ undefined;
/* stmt(24): */ let /*___25__*/ $finalArg = /*___26__*/ undefined;
/* stmt(27): */ let /*___28__*/ $finalArg$1 = /*___29__*/ undefined;
/* stmt(30): */ /*___31__*/ $finally$1: /*32~92*/ {
  /* stmt(33): */ try /*34~83*/ {
    /* stmt(37): */ let /*___38__*/ $implicitThrow = false;
    /* stmt(40): */ let /*___41__*/ $finalCatchArg = /*___42__*/ undefined;
    /* stmt(43): */ try /*44~48*/ {
      /* stmt(45): */ /*___48__*/ x = 2;
    } catch (/*___50__*/ $finalImplicit) /*51~65*/ {
      /* stmt(52): */ /*___55__*/ x = 3;
      /* stmt(56): */ /*___59__*/ $finalStep = true;
      /* stmt(60): */ /*___63__*/ $finalArg = /*___62__*/ $finalImplicit;
      /* stmt(64): */ break /*___65__*/ $finally$1;
    }
    /* stmt(66): */ /*___69__*/ x = 3;
    /* stmt(70): */ if (/*___71__*/ $implicitThrow) {
      /*72~82*/ /* stmt(73): */ /*___76__*/ $finalStep$1 = true;
      /* stmt(77): */ /*___80__*/ $finalArg$1 = /*___79__*/ $finalCatchArg;
      /* stmt(81): */ break /*___82__*/ $finally$1;
    } /*83~83*/ else {
    }
  } catch (/*___85__*/ $finalImplicit$1) /*86~92*/ {
    /* stmt(87): */ $(/*___90__*/ x);
    /* stmt(91): */ throw /*___92__*/ $finalImplicit$1;
  }
}
/* stmt(93): */ $(/*___96__*/ x);
/* stmt(97): */ if (/*___98__*/ $implicitThrow$1) {
  /*99~101*/ /* stmt(100): */ throw /*___101__*/ $finalCatchArg$1;
} /*102~118*/ else {
  /* stmt(103): */ if (/*___104__*/ $finalStep) {
    /*105~107*/ /* stmt(106): */ throw /*___107__*/ $finalArg;
  } /*108~118*/ else {
    /* stmt(109): */ if (/*___110__*/ $finalStep$1) {
      /*111~113*/ /* stmt(112): */ throw /*___113__*/ $finalArg$1;
    } /*114~118*/ else {
      /* stmt(115): */ $(/*___118__*/ x);
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @10      | ########## | 90          | none           | 48,55
  - w @48      | ########## | 90          | 10             | 55,69
  - w @55      | ########## | 90,96,118   | 10,48          | none
  - w @69      | ########## | 90,96,118   | 48             | none
  - r @90      | 10,48,55,69
  - r @96      | 55,69
  - r @118     | 55,69

$implicitThrow$1:
  - w @13            | ########## | 98          | none           | none
  - r @98            | 13

$finalStep:
  - w @16            | ########## | 104         | none           | 59
  - w @59            | ########## | 104         | 16             | none
  - r @104           | 16,59

$finalStep$1:
  - w @19            | ########## | 110         | none           | 76
  - w @76            | ########## | 110         | 19             | none
  - r @110           | 19,76

$finalCatchArg$1:
  - w @22            | ########## | 101         | none           | none
  - r @101           | 22

$finalArg:
  - w @25            | ########## | 107         | none           | 63
  - w @63            | ########## | 107         | 25             | none
  - r @107           | 25,63

$finalArg$1:
  - w @28            | ########## | 113         | none           | 80
  - w @80            | ########## | 113         | 28             | none
  - r @113           | 28,80

$implicitThrow:
  - w @38            | ########## | 71          | none           | none
  - r @71            | 38

$finalCatchArg:
  - w @41            | ########## | 79          | none           | none
  - r @79            | 41

$finalImplicit:
  - w @50            | ########## | 62          | none           | none
  - r @62            | 50

$finalImplicit$1:
  - w @85            | ########## | 92          | none           | none
  - r @92            | 85
