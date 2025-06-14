# Preval test case

# try-break-finally-break2.md

> Ref tracking > Done > Try-finally-return > Try-break-finally-break2
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
          x = 6; // overwrites 3 4 5
          break b;
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
let /*___4__*/ x = 1;
/*___7__*/ a: /*8~99*/ {
  /*___10__*/ b: /*11~95*/ {
    /*___18__*/ x = 2;
    /*___22__*/ x = 3;
    let /*___24__*/ $implicitThrow = false;
    let /*___27__*/ $finalStep = false;
    let /*___30__*/ $finalCatchArg = /*___31__*/ undefined;
    /*___33__*/ $finally: /*34~65*/ {
      try /*36~54*/ {
        if ($) {
          /*39~49*/ /*___43__*/ x = 4;
          /*___47__*/ $finalStep = true;
          break /*___49__*/ $finally;
        } /*50~54*/ else {
          /*___54__*/ x = 5;
        }
      } catch (/*___56__*/ $finalImplicit) /*57~65*/ {
        /*___61__*/ $implicitThrow = true;
        /*___65__*/ $finalCatchArg = /*___64__*/ $finalImplicit;
      }
    }
    $(/*___69__*/ x);
    if ($) {
      /*72~78*/ /*___76__*/ x = 6;
      break /*___78__*/ b;
    } /*79~95*/ else {
      if (/*___81__*/ $implicitThrow) {
        /*82~84*/ throw /*___84__*/ $finalCatchArg;
      } /*85~95*/ else {
        if (/*___87__*/ $finalStep) {
          /*88~90*/ break /*___90__*/ a;
        } /*91~95*/ else {
          $(/*___95__*/ x);
        }
      }
    }
  }
  $(/*___99__*/ x);
}
$(/*___103__*/ x);
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
