# Preval test case

# try_implicit_throw_catch_assign3.md

> Ref tracking > Try implicit throw catch assign3
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);        // x=1
  try {
    try {
      $(x);    // x=1
      x = 2;
    } finally {
      $(x);    // x=1 2
    }
    $(x);      // x=2. Cannot be 1 because that's only possible under a throw.
  } finally {
    $(x);      // x=1 2
  }
  $(x);        // x=2. because 1 would continue as a throw after the outer finally
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
try /*11*/ {
  try /*13*/ {
    $(x___17__);
    x___21__ = 2;
  } finally /*22*/ {
    $(x___26__);
  }
  $(x___30__);
} finally /*31*/ {
  $(x___35__);
}
$(x___39__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,17,26,35  | none           | 21
  - r @9       | 4
  - r @17      | 4
  - w @21      | ########## | 26,30,35,39 | 4              | none
  - r @26      | 4,21
  - r @30      | 21
  - r @35      | 4,21
  - r @39      | 21
