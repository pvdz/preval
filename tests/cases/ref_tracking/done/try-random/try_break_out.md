# Preval test case

# try_break_out.md

> Ref tracking > Done > Try-random > Try break out
>
> The challenge here is that the finally breaks outside of the finally
> and therefor changes the continuation, whether there was a break to A
> or not. Even the throw would be picked up and changed. (May need to
> test that explicitly, but ok)

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x,1);             // x=1
  A: {
    $(x,1);           // x=1
    x = 2;
    B: {
      try {
        $(x,2);       // x=2
        if (x,2) {    // x=2
          x = 3;
          break A;
        }
        x = 4;
      } finally {
        if ($()) {
          $(x);       // x=2 3 4
          // This overrides the original continuation, both the implicit (x=4)
          // and the break to A (x=3) and even the unexpected throw (x=2).
          break B;
        }
        $(x, 2,3,4);  // x=2 3 4
      }
      // (NOT 3: either that breaks to A or to B)
      // (NOT 2: can only happen with an unexpected throw which would
      // either be overridden by the break to B (skips this) and else
      // would still throw after the finally completes)
      // Not sure if I can manage that but I also don't really have a choice 
      $(x, 4);       // x=4
    }
    $(x,3,4);        // x=3 4
    x = 5;
  }
  // If try throws immediately, then x=2 and if break overrides, then x=5
  // If try breaks then x=3. Either finally breaks then x=5 or not then x=3
  // If try doesnt break then x=4, then either way x=5, so 4 is not visible
  $(x);               // x=3 5
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ A: /*8~129*/ {
  /* stmt(9): */ /*___10__*/ B: /*11~119*/ {
    /* stmt(16): */ $(/*___19__*/ x, 1);
    /* stmt(21): */ $(/*___24__*/ x, 1);
    /* stmt(26): */ /*___29__*/ x = 2;
    /* stmt(30): */ let /*___31__*/ $implicitThrow = false;
    /* stmt(33): */ let /*___34__*/ $finalStep = false;
    /* stmt(36): */ let /*___37__*/ $finalCatchArg = /*___38__*/ undefined;
    /* stmt(39): */ /*___40__*/ $finally: /*41~81*/ {
      /* stmt(42): */ try /*43~70*/ {
        /* stmt(45): */ $(/*___48__*/ x, 2);
        /* stmt(50): */ const /*___51__*/ tmpIfTest = 2;
        /* stmt(53): */ if (/*___54__*/ tmpIfTest) {
          /*55~65*/ /* stmt(56): */ /*___59__*/ x = 3;
          /* stmt(60): */ /*___63__*/ $finalStep = true;
          /* stmt(64): */ break /*___65__*/ $finally;
        } /*66~70*/ else {
          /* stmt(67): */ /*___70__*/ x = 4;
        }
      } catch (/*___72__*/ $finalImplicit) /*73~81*/ {
        /* stmt(74): */ /*___77__*/ $implicitThrow = true;
        /* stmt(78): */ /*___81__*/ $finalCatchArg = /*___80__*/ $finalImplicit;
      }
    }
    /* stmt(82): */ const /*___83__*/ tmpIfTest$1 = $();
    /* stmt(86): */ if (/*___87__*/ tmpIfTest$1) {
      /*88~94*/ /* stmt(89): */ $(/*___92__*/ x);
      /* stmt(93): */ break /*___94__*/ B;
    } /*95~119*/ else {
      /* stmt(96): */ $(/*___99__*/ x, 2, 3, 4);
      /* stmt(103): */ if (/*___104__*/ $implicitThrow) {
        /*105~107*/ /* stmt(106): */ throw /*___107__*/ $finalCatchArg;
      } /*108~119*/ else {
        /* stmt(109): */ if (/*___110__*/ $finalStep) {
          /*111~113*/ /* stmt(112): */ break /*___113__*/ A;
        } /*114~119*/ else {
          /* stmt(115): */ $(/*___118__*/ x, 4);
        }
      }
    }
  }
  /* stmt(120): */ $(/*___123__*/ x, 3, 4);
  /* stmt(126): */ /*___129__*/ x = 5;
}
/* stmt(130): */ $(/*___133__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,24       | none           | 29
  - r @19      | 4
  - r @24      | 4
  - w @29      | ########## | 48,92,99,118,123,133 | 4              | 59,70,129
  - r @48      | 29
  - w @59      | ########## | 92,99,118,123,133 | 29             | 129
  - w @70      | ########## | 92,99,118,123,133 | 29             | 129
  - r @92      | 29,59,70
  - r @99      | 29,59,70
  - r @118     | 29,59,70
  - r @123     | 29,59,70
  - w @129     | ########## | 133         | 29,59,70       | none
  - r @133     | 29,59,70,129

$implicitThrow:
  - w @31          | ########## | 104         | none           | 77
  - w @77          | ########## | 104         | 31             | none
  - r @104         | 31,77

$finalStep:
  - w @34          | ########## | 110         | none           | 63
  - w @63          | ########## | 110         | 34             | none
  - r @110         | 34,63

$finalCatchArg:
  - w @37          | ########## | 107         | none           | 81
  - w @81          | ########## | 107         | 37             | none
  - r @107         | 37,81

tmpIfTest:
  - w @51          | ########## | 54          | none           | none
  - r @54          | 51

$finalImplicit:
  - w @72          | ########## | 80          | none           | none
  - r @80          | 72

tmpIfTest$1:
  - w @83          | ########## | 87          | none           | none
  - r @87          | 83
