# Preval test case

# label_try_finally_if_break.md

> Ref tracking > Done > Try > Label try finally if break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  here: {
    $(x);              // x=1
    x = $(2);
    try {
      $(x);            // x=2
      x = $(3);
      break here;
    } finally {
      $(x);            // x=2 3
      x = $(4);
    }
    $(x);              // unreachable (but would be 4 otherwise)
    x = $(5);          // unreachable
  }
  $(x);                // x=4
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = $(1);
/* stmt(8): */ /*___9__*/ here: /*10~82*/ {
  /* stmt(14): */ $(/*___17__*/ x);
  /* stmt(18): */ /*___23__*/ x = $(2);
  /* stmt(24): */ let /*___25__*/ $implicitThrow = false;
  /* stmt(27): */ let /*___28__*/ $finalStep = false;
  /* stmt(30): */ let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
  /* stmt(33): */ /*___34__*/ $finally: /*35~64*/ {
    /* stmt(36): */ try /*37~53*/ {
      /* stmt(38): */ $(/*___41__*/ x);
      /* stmt(42): */ /*___47__*/ x = $(3);
      /* stmt(48): */ /*___51__*/ $finalStep = true;
      /* stmt(52): */ break /*___53__*/ $finally;
    } catch (/*___55__*/ $finalImplicit) /*56~64*/ {
      /* stmt(57): */ /*___60__*/ $implicitThrow = true;
      /* stmt(61): */ /*___64__*/ $finalCatchArg = /*___63__*/ $finalImplicit;
    }
  }
  /* stmt(65): */ $(/*___68__*/ x);
  /* stmt(69): */ /*___74__*/ x = $(4);
  /* stmt(75): */ if (/*___76__*/ $implicitThrow) {
    /*77~79*/ /* stmt(78): */ throw /*___79__*/ $finalCatchArg;
  } /*80~82*/ else {
    /* stmt(81): */ break /*___82__*/ here;
  }
}
/* stmt(83): */ $(/*___86__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17          | none           | 23
  - r @17      | 4
  - w @23      | ########## | 41,68       | 4              | 47,74
  - r @41      | 23
  - w @47      | ########## | 68          | 23             | 74
  - r @68      | 23,47
  - w @74      | ########## | 86          | 23,47          | none
  - r @86      | 74

$implicitThrow:
  - w @25          | ########## | 76          | none           | 60
  - w @60          | ########## | 76          | 25             | none
  - r @76          | 25,60

$finalStep:
  - w @28          | ########## | not read    | none           | 51
  - w @51          | ########## | not read    | 28             | none

$finalCatchArg:
  - w @31          | ########## | 79          | none           | 64
  - w @64          | ########## | 79          | 31             | none
  - r @79          | 31,64

$finalImplicit:
  - w @55          | ########## | 63          | none           | none
  - r @63          | 55
