# Preval test case

# try_break_goto.md

> Ref tracking > Tofix > Try break goto
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
        x = 3;  // Not visible to the next read
        break A; // This re (!) schedules the continuation to after A instead
      }
    }
    $(x);       // unreachable
    x = 4;      // unreachable
  }
  $(x);         // x=3
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(6): */ let /*___7__*/ x = 1;
/* stmt(9): */ $(/*___12__*/ x);
/* stmt(13): */ let /*___14__*/ $implicitThrow = false;
/* stmt(16): */ let /*___17__*/ $finalStep = false;
/* stmt(19): */ let /*___20__*/ $finalCatchArg = /*___21__*/ undefined;
/* stmt(22): */ /*___23__*/ $finally: /*24~51*/ {
  /* stmt(25): */ try /*26~40*/ {
    /* stmt(27): */ $(/*___30__*/ x);
    /* stmt(31): */ /*___34__*/ x = 2;
    /* stmt(35): */ /*___38__*/ $finalStep = true;
    /* stmt(39): */ break /*___40__*/ $finally;
  } catch (/*___42__*/ $finalImplicit) /*43~51*/ {
    /* stmt(44): */ /*___47__*/ $implicitThrow = true;
    /* stmt(48): */ /*___51__*/ $finalCatchArg = /*___50__*/ $finalImplicit;
  }
}
/* stmt(52): */ $(/*___55__*/ x);
/* stmt(56): */ /*___59__*/ x = 3;
/* stmt(60): */ $(/*___63__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @7       | ########## | 12,30,55    | none           | 34,59
  - r @12      | 7
  - r @30      | 7
  - w @34      | ########## | 55          | 7              | 59
  - r @55      | 7,34
  - w @59      | ########## | 63          | 7,34           | none
  - r @63      | 59

$implicitThrow:
  - w @14          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 14             | none

$finalStep:
  - w @17          | ########## | not read    | none           | 38
  - w @38          | ########## | not read    | 17             | none

$finalCatchArg:
  - w @20          | ########## | not read    | none           | 51
  - w @51          | ########## | not read    | 20             | none

$finalImplicit:
  - w @42          | ########## | 50          | none           | none
  - r @50          | 42
