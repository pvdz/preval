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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ back: /*8~135*/ {
  /* stmt(14): */ let /*___15__*/ $implicitThrow$1 = false;
  /* stmt(17): */ let /*___18__*/ $finalCatchArg$1 = /*___19__*/ undefined;
  /* stmt(20): */ try /*21~25*/ {
    /* stmt(22): */ /*___25__*/ x = 2;
  } catch (/*___27__*/ $finalImplicit$1) /*28~36*/ {
    /* stmt(29): */ /*___32__*/ $implicitThrow$1 = true;
    /* stmt(33): */ /*___36__*/ $finalCatchArg$1 = /*___35__*/ $finalImplicit$1;
  }
  /* stmt(37): */ $();
  /* stmt(40): */ /*___43__*/ x = 3;
  /* stmt(44): */ let /*___45__*/ $implicitThrow = false;
  /* stmt(47): */ let /*___48__*/ $finalStep = false;
  /* stmt(50): */ let /*___51__*/ $finalCatchArg = /*___52__*/ undefined;
  /* stmt(53): */ /*___54__*/ $finally: /*55~99*/ {
    /* stmt(56): */ try /*57~84*/ {
      /* stmt(59): */ /*___62__*/ x = 4;
      /* stmt(63): */ const /*___64__*/ tmpIfTest = $();
      /* stmt(67): */ if (/*___68__*/ tmpIfTest) {
        /*69~79*/ /* stmt(70): */ /*___73__*/ x = 5;
        /* stmt(74): */ /*___77__*/ $finalStep = true;
        /* stmt(78): */ break /*___79__*/ $finally;
      } /*80~84*/ else {
        /* stmt(81): */ /*___84__*/ x = 6;
      }
    } catch (/*___86__*/ $finalImplicit) /*87~99*/ {
      /* stmt(88): */ $(`final`, /*___93__*/ x);
      /* stmt(94): */ /*___97__*/ x = 7;
      /* stmt(98): */ throw /*___99__*/ $finalImplicit;
    }
  }
  /* stmt(100): */ $(`final`, /*___105__*/ x);
  /* stmt(106): */ /*___109__*/ x = 7;
  /* stmt(110): */ if (/*___111__*/ $implicitThrow) {
    /*112~114*/ /* stmt(113): */ throw /*___114__*/ $finalCatchArg;
  } /*115~135*/ else {
    /* stmt(116): */ if (/*___117__*/ $finalStep) {
      /*118~120*/ /* stmt(119): */ break /*___120__*/ back;
    } /*121~135*/ else {
      /* stmt(122): */ /*___125__*/ x = 8;
      /* stmt(126): */ if (/*___127__*/ $implicitThrow$1) {
        /*128~130*/ /* stmt(129): */ throw /*___130__*/ $finalCatchArg$1;
      } /*131~135*/ else {
        /* stmt(132): */ /*___135__*/ x = 9;
      }
    }
  }
}
/* stmt(136): */ $(/*___139__*/ x);
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
