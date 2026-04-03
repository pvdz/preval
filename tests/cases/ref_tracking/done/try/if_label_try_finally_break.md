# Preval test case

# if_label_try_finally_break.md

> Ref tracking > Done > Try > If label try finally break
>
> The break goes through a finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {                 // x=1
    $(x);                  // x=1
    x = $(2);
    here: {
      $(x);                // x=2
      x = $(3);
      try {
        $(x);              // x=3
        x = $(4);
        break here;
      } finally {
        $(x);              // x=3 or 4
        x = $(5);          // visited (!)
      }
      $(x);                // unreachable
      x = $(6);            // not visited, so not observed (else, 5?)
    }
    $(x);                  // x=5 (always)
    x = $(7);              // visited
  }
  $(x);                    // x=1 or x=7
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = $(1);
/* stmt(8): */ if (/*___9__*/ x) {
  /*10~109*/ /* stmt(11): */ /*___12__*/ here: /*13~95*/ {
    /* stmt(17): */ $(/*___20__*/ x);
    /* stmt(21): */ /*___26__*/ x = $(2);
    /* stmt(27): */ $(/*___30__*/ x);
    /* stmt(31): */ /*___36__*/ x = $(3);
    /* stmt(37): */ let /*___38__*/ $implicitThrow = false;
    /* stmt(40): */ let /*___41__*/ $finalStep = false;
    /* stmt(43): */ let /*___44__*/ $finalCatchArg = /*___45__*/ undefined;
    /* stmt(46): */ /*___47__*/ $finally: /*48~77*/ {
      /* stmt(49): */ try /*50~66*/ {
        /* stmt(51): */ $(/*___54__*/ x);
        /* stmt(55): */ /*___60__*/ x = $(4);
        /* stmt(61): */ /*___64__*/ $finalStep = true;
        /* stmt(65): */ break /*___66__*/ $finally;
      } catch (/*___68__*/ $finalImplicit) /*69~77*/ {
        /* stmt(70): */ /*___73__*/ $implicitThrow = true;
        /* stmt(74): */ /*___77__*/ $finalCatchArg = /*___76__*/ $finalImplicit;
      }
    }
    /* stmt(78): */ $(/*___81__*/ x);
    /* stmt(82): */ /*___87__*/ x = $(5);
    /* stmt(88): */ if (/*___89__*/ $implicitThrow) {
      /*90~92*/ /* stmt(91): */ throw /*___92__*/ $finalCatchArg;
    } /*93~95*/ else {
      /* stmt(94): */ break /*___95__*/ here;
    }
  }
  /* stmt(96): */ $(/*___99__*/ x);
  /* stmt(100): */ /*___105__*/ x = $(7);
  /* stmt(106): */ $(/*___109__*/ x);
} /*110~114*/ else {
  /* stmt(111): */ $(/*___114__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,20,114    | none           | 26
  - r @9       | 4
  - r @20      | 4
  - w @26      | ########## | 30          | 4              | 36
  - r @30      | 26
  - w @36      | ########## | 54,81       | 26             | 60,87
  - r @54      | 36
  - w @60      | ########## | 81          | 36             | 87
  - r @81      | 36,60
  - w @87      | ########## | 99          | 36,60          | 105
  - r @99      | 87
  - w @105     | ########## | 109         | 87             | none
  - r @109     | 105
  - r @114     | 4

$implicitThrow:
  - w @38          | ########## | 89          | none           | 73
  - w @73          | ########## | 89          | 38             | none
  - r @89          | 38,73

$finalStep:
  - w @41          | ########## | not read    | none           | 64
  - w @64          | ########## | not read    | 41             | none

$finalCatchArg:
  - w @44          | ########## | 92          | none           | 77
  - w @77          | ########## | 92          | 44             | none
  - r @92          | 44,77

$finalImplicit:
  - w @68          | ########## | 76          | none           | none
  - r @76          | 68
