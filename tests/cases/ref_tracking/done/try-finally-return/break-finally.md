# Preval test case

# break-finally.md

> Ref tracking > Done > Try-finally-return > Break-finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      $(); // "may fail"
      x = 2;
      break here;
    } finally {
      $(x); // 1 or 2
      x = 3;
    }

    $(x);   // unreachable
    x = 4;  // unreachable
  }
  
  $(x); // 3 (only, but because DCE is not applied yet, it'll also read 1)
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ here: /*8~67*/ {
  let /*___13__*/ $implicitThrow = false;
  let /*___16__*/ $finalStep = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /*___22__*/ $finally: /*23~51*/ {
    try /*25~38*/ {
      $();
      /*___32__*/ x = 2;
      /*___36__*/ $finalStep = true;
      break /*___38__*/ $finally;
    } catch (/*___40__*/ $finalImplicit) /*41~51*/ {
      $(/*___45__*/ x);
      /*___49__*/ x = 3;
      throw /*___51__*/ $finalImplicit;
    }
  }
  $(/*___55__*/ x);
  /*___59__*/ x = 3;
  if (/*___61__*/ $implicitThrow) {
    /*62~64*/ throw /*___64__*/ $finalCatchArg;
  } /*65~67*/ else {
    break /*___67__*/ here;
  }
}
$(/*___71__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 45,55       | none           | 32,49,59
  - w @32      | ########## | 45,55       | 4              | 49,59
  - r @45      | 4,32
  - w @49      | ########## | not read    | 4,32           | none
  - r @55      | 4,32
  - w @59      | ########## | 71          | 4,32           | none
  - r @71      | 59

$implicitThrow:
  - w @13          | ########## | 61          | none           | none
  - r @61          | 13

$finalStep:
  - w @16          | ########## | not read    | none           | 36
  - w @36          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | 64          | none           | none
  - r @64          | 19

$finalImplicit:
  - w @40          | ########## | 51          | none           | none
  - r @51          | 40
