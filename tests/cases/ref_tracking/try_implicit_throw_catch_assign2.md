# Preval test case

# try_implicit_throw_catch_assign2.md

> Ref tracking > Try implicit throw catch assign2
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
    $(x); // x=2. Cannot be 1 because that's only possible under a throw.
  } catch {
    $(x); // x=1 2
    x = 3;
  }
  $(x); // x=2 3
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
} catch (e___32__) /*33*/ {
  $(x___37__);
  x___41__ = 3;
}
$(x___45__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,17,26,37  | none           | 21,41
  - r @9       | 4
  - r @17      | 4
  - w @21      | ########## | 26,30,37,45 | 4              | 41
  - r @26      | 4,21
  - r @30      | 21
  - r @37      | 4,21
  - w @41      | ########## | 45          | 4,21           | none
  - r @45      | 21,41
