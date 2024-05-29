# Preval test case

# if_label_try_finally_break.md

> Ref tracking > Done > Try > If label try finally break
>
> The break goes through a finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {                 // x=1
    $(x);                  // x=1
    x = $(2);
    here: {
      $(x);                // x=2
      x = $(3);
      try {
        $(x);              // x=3
        x = $(4);
        break here;
      } finally {
        $(x);              // x=3 or 4
        x = $(5);          // visited (!)
      }
      $(x);                // unreachable
      x = $(6);            // not visited, so not observed (else, 5?)
    }
    $(x);                  // x=5 (always)
    x = $(7);              // visited
  }
  $(x);                    // x=1 or x=7
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
      x___45__ = $(4);
      break here___47__;
    } finally /*48*/ {
      $(x___52__);
      x___58__ = $(5);
    }
    $(x___62__);
    x___68__ = $(6);
  }
  $(x___72__);
  x___78__ = $(7);
} /*79*/ else {
}
$(x___83__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,14,83     | none           | 20
  - r @9       | 4
  - r @14      | 4
  - w @20      | ########## | 27          | 4              | 33
  - r @27      | 20
  - w @33      | ########## | 39,52,62    | 20             | 45,58,68
  - r @39      | 33
  - w @45      | ########## | 52          | 33             | 58
  - r @52      | 33,45
  - w @58      | ########## | 72          | 33,45          | 78
  - r @62      | 33
  - w @68      | ########## | 72          | 33             | 78
  - r @72      | 58,68
  - w @78      | ########## | 83          | 58,68          | none
  - r @83      | 4,78
