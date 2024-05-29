# Preval test case

# try_entry5.md

> Ref tracking > Try entry5
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
      x = 3; // Does not overwrite itself
    } finally {
      $(x);
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
    x___26__ = 3;
  } finally /*27*/ {
    $(x___31__);
  }
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,35        | none           | 16
  - r @9       | 4
  - w @16      | ########## | 22,31       | 4,26           | 26
  - r @22      | 16
  - w @26      | ########## | 31          | 16             | 16
  - r @31      | 16,26
  - r @35      | 4
