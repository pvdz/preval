# Preval test case

# label_try_finally_if_break.md

> Ref tracking > Done > Try > Label try finally if break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  here: {
    $(x);              // x=1
    x = $(2);
    try {
      $(x);            // x=2
      x = $(3);
      break here;
    } finally {
      $(x);            // x=2 3
      x = $(4);
    }
    $(x);              // unreachable (but would be 4 otherwise)
    x = $(5);          // unreachable
  }
  $(x);                // x=4
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
here___9__: /*10*/ {
  $(x___14__);
  x___20__ = $(2);
  try /*22*/ {
    $(x___26__);
    x___32__ = $(3);
    break here___34__;
  } finally /*35*/ {
    $(x___39__);
    x___45__ = $(4);
  }
  $(x___49__);
  x___55__ = $(5);
}
$(x___59__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14          | none           | 20
  - r @14      | 4
  - w @20      | ########## | 26,39,49    | 4              | 32,45,55
  - r @26      | 20
  - w @32      | ########## | 39          | 20             | 45
  - r @39      | 20,32
  - w @45      | ########## | 59          | 20,32          | none
  - r @49      | 20
  - w @55      | ########## | 59          | 20             | none
  - r @59      | 45,55
