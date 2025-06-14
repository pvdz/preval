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
let /*___4__*/ x = 1;
/*___7__*/ here: /*8~76*/ {
  let /*___13__*/ $implicitThrow = false;
  let /*___16__*/ $finalStep = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /*___22__*/ $finally: /*23~52*/ {
    try /*25~43*/ {
      if ($) {
        /*28~38*/ /*___32__*/ x = 2;
        /*___36__*/ $finalStep = true;
        break /*___38__*/ $finally;
      } /*39~43*/ else {
        /*___43__*/ x = 3;
      }
    } catch (/*___45__*/ $finalImplicit) /*46~52*/ {
      $(/*___50__*/ x);
      throw /*___52__*/ $finalImplicit;
    }
  }
  $(/*___56__*/ x);
  if (/*___58__*/ $implicitThrow) {
    /*59~61*/ throw /*___61__*/ $finalCatchArg;
  } /*62~76*/ else {
    if (/*___64__*/ $finalStep) {
      /*65~67*/ break /*___67__*/ here;
    } /*68~76*/ else {
      $(/*___72__*/ x);
      /*___76__*/ x = 4;
    }
  }
}
$(/*___80__*/ x);
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
