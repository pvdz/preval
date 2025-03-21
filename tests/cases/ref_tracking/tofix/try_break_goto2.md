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
let x___4__ = 1;
A___7__: /*8*/ {
  $(x___12__);
  while (true) {
    /*15*/ let $implicitThrow___18__ = false;
    let $finalStep___22__ = false;
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
      /*64*/ x___68__ = 3;
      break A___70__;
    } /*71*/ else {
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
  - w @18          | ########## | 73          | none           | 53
  - w @53          | ########## | 73          | 18             | none
  - r @73          | 18,53

$finalStep:
  - w @22          | ########## | not read    | none           | 44
  - w @44          | ########## | not read    | 22             | none

$finalCatchArg:
  - w @26          | ########## | 76          | none           | 57
  - w @57          | ########## | 76          | 26             | none
  - r @76          | 26,57
