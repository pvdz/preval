# Preval test case

# try-break-finally-break3.md

> Ref tracking > Done > Try-finally-return > Try-break-finally-break3
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
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      $finally: {
        try {
          if ($) {
            x = 4;
            {
              $finalStep = true;
              break $finally;
            }
          }
          x = 5;
        } catch ($finalImplicit) {
          $implicitThrow = true;
          $finalCatchArg = $finalImplicit;
        }
      }
      $(x); // 3 4 5
      if ($) {
        x = 6;
        break b;
      }
      if ($implicitThrow) throw $finalCatchArg;
      else {
        if ($finalStep) break a;
        else {
        }
      }
      $(x); // 5 (b/c 3=throw and 4=break, skips this)
    }
    $(x); // 5 6 (b/c 3=throw and skips this)
  }
  $(x); // 4 5 6 (b/c 3=throw and skips this)
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ a: /*8~99*/ {
  /* stmt(9): */ /*___10__*/ b: /*11~95*/ {
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
    } /*79~95*/ else {
      /* stmt(80): */ if (/*___81__*/ $implicitThrow) {
        /*82~84*/ /* stmt(83): */ throw /*___84__*/ $finalCatchArg;
      } /*85~95*/ else {
        /* stmt(86): */ if (/*___87__*/ $finalStep) {
          /*88~90*/ /* stmt(89): */ break /*___90__*/ a;
        } /*91~95*/ else {
          /* stmt(92): */ $(/*___95__*/ x);
        }
      }
    }
  }
  /* stmt(96): */ $(/*___99__*/ x);
}
/* stmt(100): */ $(/*___103__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 18
  - w @18      | ########## | not read    | 4              | 22
  - w @22      | ########## | 69,95,99,103 | 18             | 43,54,76
  - w @43      | ########## | 69,95,99,103 | 22             | 76
  - w @54      | ########## | 69,95,99,103 | 22             | 76
  - r @69      | 22,43,54
  - w @76      | ########## | 99,103      | 22,43,54       | none
  - r @95      | 22,43,54
  - r @99      | 22,43,54,76
  - r @103     | 22,43,54,76

$implicitThrow:
  - w @24          | ########## | 81          | none           | 61
  - w @61          | ########## | 81          | 24             | none
  - r @81          | 24,61

$finalStep:
  - w @27          | ########## | 87          | none           | 47
  - w @47          | ########## | 87          | 27             | none
  - r @87          | 27,47

$finalCatchArg:
  - w @30          | ########## | 84          | none           | 65
  - w @65          | ########## | 84          | 30             | none
  - r @84          | 30,65

$finalImplicit:
  - w @56          | ########## | 64          | none           | none
  - r @64          | 56
