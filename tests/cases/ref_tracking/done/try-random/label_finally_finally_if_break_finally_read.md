# Preval test case

# label_finally_finally_if_break_finally_read.md

> Ref tracking > Done > Try-random > Label finally finally if break finally read
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;             // overwritten by x=2 and x=3
back: {
  try {
    x = 2;             // overwritten by x=3 (not x=9 because that's only possible by a throw in the finally, which would skip x=9)
  } finally {
    $();
    x = 3;
    try {
      x = 4;
      if ($()) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      $('final', x);   // x=3 4 5 6
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x);                  // x=7 9 (8 is overwritten by 9 but 7 may jump over it) 
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ back: /*8~135*/ {
  let /*___15__*/ $implicitThrow$1 = false;
  let /*___18__*/ $finalCatchArg$1 = /*___19__*/ undefined;
  try /*21~25*/ {
    /*___25__*/ x = 2;
  } catch (/*___27__*/ $finalImplicit$1) /*28~36*/ {
    /*___32__*/ $implicitThrow$1 = true;
    /*___36__*/ $finalCatchArg$1 = /*___35__*/ $finalImplicit$1;
  }
  $();
  /*___43__*/ x = 3;
  let /*___45__*/ $implicitThrow = false;
  let /*___48__*/ $finalStep = false;
  let /*___51__*/ $finalCatchArg = /*___52__*/ undefined;
  /*___54__*/ $finally: /*55~99*/ {
    try /*57~84*/ {
      /*___62__*/ x = 4;
      const /*___64__*/ tmpIfTest = $();
      if (/*___68__*/ tmpIfTest) {
        /*69~79*/ /*___73__*/ x = 5;
        /*___77__*/ $finalStep = true;
        break /*___79__*/ $finally;
      } /*80~84*/ else {
        /*___84__*/ x = 6;
      }
    } catch (/*___86__*/ $finalImplicit) /*87~99*/ {
      $(`final`, /*___93__*/ x);
      /*___97__*/ x = 7;
      throw /*___99__*/ $finalImplicit;
    }
  }
  $(`final`, /*___105__*/ x);
  /*___109__*/ x = 7;
  if (/*___111__*/ $implicitThrow) {
    /*112~114*/ throw /*___114__*/ $finalCatchArg;
  } /*115~135*/ else {
    if (/*___117__*/ $finalStep) {
      /*118~120*/ break /*___120__*/ back;
    } /*121~135*/ else {
      /*___125__*/ x = 8;
      if (/*___127__*/ $implicitThrow$1) {
        /*128~130*/ throw /*___130__*/ $finalCatchArg$1;
      } /*131~135*/ else {
        /*___135__*/ x = 9;
      }
    }
  }
}
$(/*___139__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 25,43
  - w @25      | ########## | not read    | 4              | 43
  - w @43      | ########## | 93          | 4,25           | 62,97
  - w @62      | ########## | 93          | 43             | 73,84,97
  - w @73      | ########## | 93,105      | 62             | 97,109
  - w @84      | ########## | 93,105      | 62             | 97,109
  - r @93      | 43,62,73,84
  - w @97      | ########## | not read    | 43,62,73,84    | none
  - r @105     | 73,84
  - w @109     | ########## | 139         | 73,84          | 125
  - w @125     | ########## | not read    | 109            | 135
  - w @135     | ########## | 139         | 125            | none
  - r @139     | 109,135

$implicitThrow$1:
  - w @15            | ########## | 127         | none           | 32
  - w @32            | ########## | 127         | 15             | none
  - r @127           | 15,32

$finalCatchArg$1:
  - w @18            | ########## | 130         | none           | 36
  - w @36            | ########## | 130         | 18             | none
  - r @130           | 18,36

$finalImplicit$1:
  - w @27            | ########## | 35          | none           | none
  - r @35            | 27

$implicitThrow:
  - w @45            | ########## | 111         | none           | none
  - r @111           | 45

$finalStep:
  - w @48            | ########## | 117         | none           | 77
  - w @77            | ########## | 117         | 48             | none
  - r @117           | 48,77

$finalCatchArg:
  - w @51            | ########## | 114         | none           | none
  - r @114           | 51

tmpIfTest:
  - w @64            | ########## | 68          | none           | none
  - r @68            | 64

$finalImplicit:
  - w @86            | ########## | 99          | none           | none
  - r @99            | 86
