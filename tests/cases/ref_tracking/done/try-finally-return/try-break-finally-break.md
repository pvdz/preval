# Preval test case

# try-break-finally-break.md

> Ref tracking > Done > Try-finally-return > Try-break-finally-break
> Trying to come up with a case where abrupt flow distortion matters

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  a: {
    x = 2;
    b: {
      x = 3;
      try {
        if ($) {
          x = 4;
          break a;
        }
        x = 5;
      } finally {
        $(x); // 3 4 5
        if ($) {
          x = 6;
          break b;
        }
        x = 7;
      }
      $(x); // 7
    }
    $(x); // 6 7
  }
  $(x); // 6 7
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ a: /*8~103*/ {
  /* stmt(9): */ /*___10__*/ b: /*11~99*/ {
    /* stmt(15): */ /*___18__*/ x = 2;
    /* stmt(19): */ /*___22__*/ x = 3;
    /* stmt(23): */ let /*___24__*/ $implicitThrow = false;
    /* stmt(26): */ let /*___27__*/ $finalStep = false;
    /* stmt(29): */ let /*___30__*/ $finalCatchArg = /*___31__*/ undefined;
    /* stmt(32): */ /*___33__*/ $finally: /*34~65*/ {
      /* stmt(35): */ try /*36~54*/ {
        /* stmt(37): */ if ($) {
          /*39~49*/ /* stmt(40): */ /*___43__*/ x = 4;
          /* stmt(44): */ /*___47__*/ $finalStep = true;
          /* stmt(48): */ break /*___49__*/ $finally;
        } /*50~54*/ else {
          /* stmt(51): */ /*___54__*/ x = 5;
        }
      } catch (/*___56__*/ $finalImplicit) /*57~65*/ {
        /* stmt(58): */ /*___61__*/ $implicitThrow = true;
        /* stmt(62): */ /*___65__*/ $finalCatchArg = /*___64__*/ $finalImplicit;
      }
    }
    /* stmt(66): */ $(/*___69__*/ x);
    /* stmt(70): */ if ($) {
      /*72~78*/ /* stmt(73): */ /*___76__*/ x = 6;
      /* stmt(77): */ break /*___78__*/ b;
    } /*79~99*/ else {
      /* stmt(80): */ /*___83__*/ x = 7;
      /* stmt(84): */ if (/*___85__*/ $implicitThrow) {
        /*86~88*/ /* stmt(87): */ throw /*___88__*/ $finalCatchArg;
      } /*89~99*/ else {
        /* stmt(90): */ if (/*___91__*/ $finalStep) {
          /*92~94*/ /* stmt(93): */ break /*___94__*/ a;
        } /*95~99*/ else {
          /* stmt(96): */ $(/*___99__*/ x);
        }
      }
    }
  }
  /* stmt(100): */ $(/*___103__*/ x);
}
/* stmt(104): */ $(/*___107__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 18
  - w @18      | ########## | not read    | 4              | 22
  - w @22      | ########## | 69          | 18             | 43,54,76,83
  - w @43      | ########## | 69          | 22             | 76,83
  - w @54      | ########## | 69          | 22             | 76,83
  - r @69      | 22,43,54
  - w @76      | ########## | 103,107     | 22,43,54       | none
  - w @83      | ########## | 99,103,107  | 22,43,54       | none
  - r @99      | 83
  - r @103     | 76,83
  - r @107     | 76,83

$implicitThrow:
  - w @24          | ########## | 85          | none           | 61
  - w @61          | ########## | 85          | 24             | none
  - r @85          | 24,61

$finalStep:
  - w @27          | ########## | 91          | none           | 47
  - w @47          | ########## | 91          | 27             | none
  - r @91          | 27,47

$finalCatchArg:
  - w @30          | ########## | 88          | none           | 65
  - w @65          | ########## | 88          | 30             | none
  - r @88          | 30,65

$finalImplicit:
  - w @56          | ########## | 64          | none           | none
  - r @64          | 56
