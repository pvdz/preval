# Preval test case

# try_break_goto2.md

> Ref tracking > Tofix > Try break goto2
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);         // x=1
  A: {
    while (true) {
      try {
        $(x);   // x=1
        x = 2;
        break;  // This would schedule a continuation to after the while
      } finally {
        $(x);   // x=1 2
        if ($1) {
          x = 3;  // Not visible to the next read
          // This re (!) schedules the continuation to after A instead
          // If the try throws then this would sort-of catch that too.
          // That makes 1 and 2 visible to the final read.
          break A;
        }
        // Else it implicitly breaks to the while
      }
    }
    $(x);       // x=2 (NOT 3)
    x = 4;
  }
  $(x);         // x=3 4 (if 1 then either it throws or it gets overwritten to 3 or 4)
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ A: /*8~86*/ {
  $(/*___12__*/ x);
  while (true) {
    /*15~78*/ let /*___20__*/ $implicitThrow = false;
    let /*___23__*/ $finalStep = false;
    let /*___26__*/ $finalCatchArg = /*___27__*/ undefined;
    /*___29__*/ $finally: /*30~57*/ {
      try /*32~46*/ {
        $(/*___36__*/ x);
        /*___40__*/ x = 2;
        /*___44__*/ $finalStep = true;
        break /*___46__*/ $finally;
      } catch (/*___48__*/ $finalImplicit) /*49~57*/ {
        /*___53__*/ $implicitThrow = true;
        /*___57__*/ $finalCatchArg = /*___56__*/ $finalImplicit;
      }
    }
    $(/*___61__*/ x);
    if ($1) {
      /*64~70*/ /*___68__*/ x = 3;
      break /*___70__*/ A;
    } /*71~78*/ else {
      if (/*___73__*/ $implicitThrow) {
        /*74~76*/ throw /*___76__*/ $finalCatchArg;
      } /*77~78*/ else {
        break;
      }
    }
  }
  $(/*___82__*/ x);
  /*___86__*/ x = 4;
}
$(/*___90__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,36,61,82 | none           | 40,68,86
  - r @12      | 4
  - r @36      | 4,40
  - w @40      | ########## | 36,61,82    | 4,40           | 40,68,86
  - r @61      | 4,40
  - w @68      | ########## | 90          | 4,40           | none
  - r @82      | 4,40
  - w @86      | ########## | 90          | 4,40           | none
  - r @90      | 68,86

$implicitThrow:
  - w @20          | ########## | 73          | none           | 53
  - w @53          | ########## | 73          | 20             | none
  - r @73          | 20,53

$finalStep:
  - w @23          | ########## | not read    | none           | 44
  - w @44          | ########## | not read    | 23             | none

$finalCatchArg:
  - w @26          | ########## | 76          | none           | 57
  - w @57          | ########## | 76          | 26             | none
  - r @76          | 26,57

$finalImplicit:
  - w @48          | ########## | 56          | none           | none
  - r @56          | 48
