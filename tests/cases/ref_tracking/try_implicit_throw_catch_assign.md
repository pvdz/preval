# Preval test case

# try_implicit_throw_catch_assign.md

> Ref tracking > Try implicit throw catch assign
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  try {
    try {
      $(x); // x=1
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    x = 3;
  } catch {
    $(x); // x=1 2 3
    x = 4;
  }
  $(x); // x=3 4
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
  x___30__ = 3;
} catch (e___32__) /*33*/ {
  $(x___37__);
  x___41__ = 4;
}
$(x___45__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,17,26,37  | none           | 21,41
  - r @9       | 4
  - r @17      | 4
  - w @21      | ########## | 26,37       | 4              | 30,41
  - r @26      | 4,21
  - w @30      | ########## | 37,45       | 21             | 41
  - r @37      | 4,21,30
  - w @41      | ########## | 45          | 4,21,30        | none
  - r @45      | 30,41
