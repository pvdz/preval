# Preval test case

# break-finally-cond.md

> Ref tracking > Tofix > Break-finally-cond

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      if ($) {
        x = 2;
        break here;
      }
      x = 3;
    } finally {
      // x=1 when $ is not defined (crash)
      // x=2 when $ is truthy
      // x=3 when $ is falsy
      $(x); // x=1 2 3
    }

    $(x); // x=3 (only!)
    x = 4;
  }
  
  $(x); // x=2 4 (because 1 is a crash so 1 skips this)
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ here: /*8~76*/ {
  /* stmt(12): */ let /*___13__*/ $implicitThrow = false;
  /* stmt(15): */ let /*___16__*/ $finalStep = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ /*___22__*/ $finally: /*23~52*/ {
    /* stmt(24): */ try /*25~43*/ {
      /* stmt(26): */ if ($) {
        /*28~38*/ /* stmt(29): */ /*___32__*/ x = 2;
        /* stmt(33): */ /*___36__*/ $finalStep = true;
        /* stmt(37): */ break /*___38__*/ $finally;
      } /*39~43*/ else {
        /* stmt(40): */ /*___43__*/ x = 3;
      }
    } catch (/*___45__*/ $finalImplicit) /*46~52*/ {
      /* stmt(47): */ $(/*___50__*/ x);
      /* stmt(51): */ throw /*___52__*/ $finalImplicit;
    }
  }
  /* stmt(53): */ $(/*___56__*/ x);
  /* stmt(57): */ if (/*___58__*/ $implicitThrow) {
    /*59~61*/ /* stmt(60): */ throw /*___61__*/ $finalCatchArg;
  } /*62~76*/ else {
    /* stmt(63): */ if (/*___64__*/ $finalStep) {
      /*65~67*/ /* stmt(66): */ break /*___67__*/ here;
    } /*68~76*/ else {
      /* stmt(69): */ $(/*___72__*/ x);
      /* stmt(73): */ /*___76__*/ x = 4;
    }
  }
}
/* stmt(77): */ $(/*___80__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 50          | none           | 32,43
  - w @32      | ########## | 50,56,72,80 | 4              | 76
  - w @43      | ########## | 50,56,72,80 | 4              | 76
  - r @50      | 4,32,43
  - r @56      | 32,43
  - r @72      | 32,43
  - w @76      | ########## | 80          | 32,43          | none
  - r @80      | 32,43,76

$implicitThrow:
  - w @13          | ########## | 58          | none           | none
  - r @58          | 13

$finalStep:
  - w @16          | ########## | 64          | none           | 36
  - w @36          | ########## | 64          | 16             | none
  - r @64          | 16,36

$finalCatchArg:
  - w @19          | ########## | 61          | none           | none
  - r @61          | 19

$finalImplicit:
  - w @45          | ########## | 52          | none           | none
  - r @52          | 45
