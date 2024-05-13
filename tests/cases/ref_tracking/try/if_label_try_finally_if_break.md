# Preval test case

# if_label_try_finally_if_break.md

> Ref tracking > Try > If label try finally if break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {               // x=1
    $(x);                // x=1
    x = $(2);
    here: {
      $(x);              // x=2
      x = $(3);
      try {
        $(x);            // x=3
        if (x) {         // x=3
          x = $(4);
          break here;
        }
        x = $(5);        // unreachable once we inline x=3
      } finally {
        $(x);            // x=3 4 5
        x = $(6);
      }
      $(x);              // x=6
      x = $(7);
    }
    $(x);                // x=6 7 (only 6 once we inline x)
    x = $(8);
  }
  $(x);                  // x=1 8
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if (x___9__) {
  /*10*/ $(x___14__);
  x___20__ = $(2);
  here___22__: /*23*/ {
    $(x___27__);
    x___33__ = $(3);
    try /*35*/ {
      $(x___39__);
      if (x___41__) {
        /*42*/ x___48__ = $(4);
        break here___50__;
      } /*51*/ else {
        x___57__ = $(5);
      }
    } finally /*58*/ {
      $(x___62__);
      x___68__ = $(6);
    }
    $(x___72__);
    x___78__ = $(7);
  }
  $(x___82__);
  x___88__ = $(8);
} /*89*/ else {
}
$(x___93__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,14,93     | none           | 20
  - r @9       | 4
  - r @14      | 4
  - w @20      | ########## | 27          | 4              | 33
  - r @27      | 20
  - w @33      | ########## | 39,41,62    | 20             | 48,57,68
  - r @39      | 33
  - r @41      | 33
  - w @48      | ########## | 62,82       | 33             | 68,88
  - w @57      | ########## | 62          | 33             | 68
  - r @62      | 33,48,57
  - w @68      | ########## | 72          | 33,48,57       | 78
  - r @72      | 68
  - w @78      | ########## | 82          | 68             | 88
  - r @82      | 78,48
  - w @88      | ########## | 93          | 78,48          | none
  - r @93      | 4,88
