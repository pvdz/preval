# Preval test case

# label_try_finally_if_break2.md

> Ref tracking > Done > Try > Label try finally if break2
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    $(x);              // x=1
    x = 2;
    try {
      $(x);            // x=2
      x = 3;
      break here;
    } finally {
      $(x);            // x=2 3
      x = 4;
      // Only the break goes through here and then jumps to after the label
    }
    // While unreachable, note that the analysis walks the block, sees it
    // doesn't complete abruptly, and assumes natural code flow would just
    // continue here. I expect that we can DCE this code later... :)
    $(x);              // unreachable (but would be 4 otherwise)
    x = 5;             // unreachable
  }
  $(x);                // x=4
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  $(x___12__);
  x___16__ = 2;
  try /*18*/ {
    $(x___22__);
    x___26__ = 3;
    break here___28__;
  } finally /*29*/ {
    $(x___33__);
    x___37__ = 4;
  }
  $(x___41__);
  x___45__ = 5;
}
$(x___49__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 16
  - r @12      | 4
  - w @16      | ########## | 22,33,41    | 4              | 26,37,45
  - r @22      | 16
  - w @26      | ########## | 33          | 16             | 37
  - r @33      | 16,26
  - w @37      | ########## | 49          | 16,26          | none
  - r @41      | 16
  - w @45      | ########## | 49          | 16             | none
  - r @49      | 37,45
