# Preval test case

# try_loop_entry1.md

> Ref tracking > Tofix > Try loop entry1
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1
    } finally {
      $(x);   // x=1
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(5): */ let /*___6__*/ x = 1;
/* stmt(8): */ $(/*___11__*/ x);
/* stmt(12): */ let /*___13__*/ $implicitThrow = false;
/* stmt(15): */ let /*___16__*/ $finalCatchArg = /*___17__*/ undefined;
/* stmt(18): */ try /*19~23*/ {
  /* stmt(20): */ $(/*___23__*/ x);
} catch (/*___25__*/ $finalImplicit) /*26~34*/ {
  /* stmt(27): */ /*___30__*/ $implicitThrow = true;
  /* stmt(31): */ /*___34__*/ $finalCatchArg = /*___33__*/ $finalImplicit;
}
/* stmt(35): */ $(/*___38__*/ x);
/* stmt(39): */ /*___42__*/ x = 2;
/* stmt(43): */ $(/*___46__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 11,23,38    | none           | 42
  - r @11      | 6
  - r @23      | 6
  - r @38      | 6
  - w @42      | ########## | 46          | 6              | none
  - r @46      | 42

$implicitThrow:
  - w @13          | ########## | not read    | none           | 30
  - w @30          | ########## | not read    | 13             | none

$finalCatchArg:
  - w @16          | ########## | not read    | none           | 34
  - w @34          | ########## | not read    | 16             | none

$finalImplicit:
  - w @25          | ########## | 33          | none           | none
  - r @33          | 25
