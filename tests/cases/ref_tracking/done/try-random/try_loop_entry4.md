# Preval test case

# try_loop_entry4.md

> Ref tracking > Done > Try-random > Try loop entry4
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) { // never loops
    try {
      $(x);   // x=1 (not 2)
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    } finally {
      $(x);   // x=1 2
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~63*/ let /*___17__*/ $implicitThrow = false;
  let /*___20__*/ $finalStep = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /*___26__*/ $finally: /*27~52*/ {
    try /*29~43*/ {
      $(/*___33__*/ x);
      /*___37__*/ x = 2;
      /*___41__*/ $finalStep = true;
      break /*___43__*/ $finally;
    } catch (/*___45__*/ $finalImplicit) /*46~52*/ {
      $(/*___50__*/ x);
      throw /*___52__*/ $finalImplicit;
    }
  }
  $(/*___56__*/ x);
  if (/*___58__*/ $implicitThrow) {
    /*59~61*/ throw /*___61__*/ $finalCatchArg;
  } /*62~63*/ else {
    break;
  }
}
$(/*___67__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,33,50,56,67 | none           | 37
  - r @9       | 4
  - r @33      | 4
  - w @37      | ########## | 50,56,67    | 4              | none
  - r @50      | 4,37
  - r @56      | 4,37
  - r @67      | 4,37

$implicitThrow:
  - w @17          | ########## | 58          | none           | none
  - r @58          | 17

$finalStep:
  - w @20          | ########## | not read    | none           | 41
  - w @41          | ########## | not read    | 20             | none

$finalCatchArg:
  - w @23          | ########## | 61          | none           | none
  - r @61          | 23

$finalImplicit:
  - w @45          | ########## | 52          | none           | none
  - r @52          | 45
