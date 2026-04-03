# Preval test case

# try_break_goto8.md

> Ref tracking > Tofix > Try break goto8
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
$(x);
A: {
  while (true) {
    $finally: {
      try {
        $(x); // x=1 (while does not loop)
        x = 2;
        break $finally;
      } catch (_) {
      }
    }
    $(x);     // x=1 2 (may never reach x=2)
    if ($) {
      x = 3;
      break A;
    }
  }
  $(x);       // unreachable
  x = 4;      // unreachable
}
$(x);         // x=3 (loop can only break after x=3)
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~43*/ /* stmt(13): */ /*___14__*/ $finally: /*15~30*/ {
    /* stmt(16): */ try /*17~27*/ {
      /* stmt(18): */ $(/*___21__*/ x);
      /* stmt(22): */ /*___25__*/ x = 2;
      /* stmt(26): */ break /*___27__*/ $finally;
    } catch (/*___29__*/ _) /*30~30*/ {}
  }
  /* stmt(31): */ $(/*___34__*/ x);
  /* stmt(35): */ if ($) {
    /*37~42*/ /* stmt(38): */ /*___41__*/ x = 3;
    /* stmt(42): */ break;
  } /*43~43*/ else {
  }
}
/* stmt(44): */ $(/*___47__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21,34     | none           | 25,41
  - r @9       | 4
  - r @21      | 4,25
  - w @25      | ########## | 21,34       | 4,25           | 25,41
  - r @34      | 4,25
  - w @41      | ########## | 47          | 4,25           | none
  - r @47      | 41

_:
  - w @29      | ########## | not read    | none           | none
