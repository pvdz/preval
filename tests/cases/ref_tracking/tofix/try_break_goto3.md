# Preval test case

# try_break_goto3.md

> Ref tracking > Tofix > Try break goto3
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
          // This re (!) schedules the continuation to after A instead
          // If the try throws then this would sort-of catch that too.
          // That makes 1 and 2 visible to the final read.
          break A; 
        }
        x = 3;  // Only observable by the next read, not after the label
        // Else it implicitly breaks to the while
      }
    }
    $(x);       // x=3 (NOT 1 2)
    x = 4;
  }
                // The finally transform would also force ref tracking to consider 1 possible here.
  $(x);         // x=1 2 4 (NOT 3). Note that a throw could convert to break.
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
      /*64~66*/ break /*___66__*/ A;
    } /*67~78*/ else {
      /*___71__*/ x = 3;
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
  - w @4       | ########## | 12,36,61,90 | none           | 40,71
  - r @12      | 4
  - r @36      | 4
  - w @40      | ########## | 61,90       | 4              | 71
  - r @61      | 4,40
  - w @71      | ########## | 82          | 4,40           | 86
  - r @82      | 71
  - w @86      | ########## | 90          | 71             | none
  - r @90      | 4,40,86

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
