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
let x___4__ = 1;
A___7__: /*8*/ {
  $(x___12__);
  while (true) {
    /*15*/ let $implicitThrow___20__ = false;
    let $finalStep___23__ = false;
    let $finalCatchArg___26__ = undefined___27__;
    $finally___29__: /*30*/ {
      try /*32*/ {
        $(x___36__);
        x___40__ = 2;
        $finalStep___44__ = true;
        break $finally___46__;
      } catch ($finalImplicit___48__) /*49*/ {
        $implicitThrow___53__ = true;
        $finalCatchArg___57__ = $finalImplicit___56__;
      }
    }
    $(x___61__);
    if ($1) {
      /*64*/ break A___66__;
    } /*67*/ else {
      x___71__ = 3;
      if ($implicitThrow___73__) {
        /*74*/ throw $finalCatchArg___76__;
      } /*77*/ else {
        break;
      }
    }
  }
  $(x___82__);
  x___86__ = 4;
}
$(x___90__);
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
