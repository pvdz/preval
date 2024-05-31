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
  $(x);         // x=2 4 (NOT 3). Note that a throw could convert to break.
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
A___11__: /*12*/ {
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
      /*64*/ break A___66__;
    } /*67*/ else {
      x___71__ = 3;
      if ($implicitThrow___73__) {
        /*74*/ throw $finalCatchArg___76__;
      } /*77*/ else {
        if ($finalStep___79__) {
          /*80*/ break;
        } /*82*/ else {
        }
      }
    }
  }
  $(x___86__);
  x___90__ = 4;
}
$(x___94__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,36,61,94  | none           | 40,71
  - r @9       | 4
  - r @36      | 4,71
  - w @40      | ########## | 61,94       | 4,71           | 71
  - r @61      | 4,40,71
  - w @71      | ########## | 36,61,86,94 | 4,40,71        | 40,71,90
  - r @86      | 71
  - w @90      | ########## | 94          | 71             | none
  - r @94      | 4,40,71,90

$implicitThrow:
  - w @18          | ########## | 73          | none           | 53
  - w @53          | ########## | 73          | 18             | none
  - r @73          | 18,53

$finalStep:
  - w @22          | ########## | 79          | none           | 44
  - w @44          | ########## | 79          | 22             | none
  - r @79          | 22,44

$finalCatchArg:
  - w @26          | ########## | 76          | none           | 57
  - w @57          | ########## | 76          | 26             | none
  - r @76          | 26,57
