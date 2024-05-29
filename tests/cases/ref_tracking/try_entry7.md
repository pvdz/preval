# Preval test case

# try_entry7.md

> Ref tracking > Try entry7
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    x = 2;
    try {
      $(x);
    } finally {
      $(x);
      x = 3; // Does not overwrite itself
    }
  }
  $(x); // unreachable
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ x___16__ = 2;
  try /*18*/ {
    $(x___22__);
  } finally /*23*/ {
    $(x___27__);
    x___31__ = 3;
  }
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,35        | none           | 16
  - r @9       | 4
  - w @16      | ########## | 22,27       | 4,31           | 31
  - r @22      | 16
  - r @27      | 16
  - w @31      | ########## | not read    | 16             | 16
  - r @35      | 4
