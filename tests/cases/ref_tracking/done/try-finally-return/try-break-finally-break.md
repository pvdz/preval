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
let /*___4__*/ x = 1;
/*___7__*/ a: /*8~103*/ {
  /*___10__*/ b: /*11~99*/ {
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
    } /*79~99*/ else {
      /*___83__*/ x = 7;
      if (/*___85__*/ $implicitThrow) {
        /*86~88*/ throw /*___88__*/ $finalCatchArg;
      } /*89~99*/ else {
        if (/*___91__*/ $finalStep) {
          /*92~94*/ break /*___94__*/ a;
        } /*95~99*/ else {
          $(/*___99__*/ x);
        }
      }
    }
  }
  $(/*___103__*/ x);
}
$(/*___107__*/ x);
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
