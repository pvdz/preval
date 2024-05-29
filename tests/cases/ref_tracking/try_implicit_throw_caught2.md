# Preval test case

# try_implicit_throw_caught2.md

> Ref tracking > Try implicit throw caught2
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);         // x=1
  try {
    try {
      try {
        $(x);   // x=1
        x = 2;
      } finally {
        $(x);   // x=1 2
      }
      $(x);     // x=2. Cannot be 1 because that's only possible under a throw.
    } catch {
      $(x);     // x=1 2
    }
  } finally {
    $(x);       // x=1 2
  }
  $(x);         // x=1 2
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
try /*11*/ {
  try /*13*/ {
    try /*15*/ {
      $(x___19__);
      x___23__ = 2;
    } finally /*24*/ {
      $(x___28__);
    }
    $(x___32__);
  } catch (e___34__) /*35*/ {
    $(x___39__);
  }
} finally /*40*/ {
  $(x___44__);
}
$(x___48__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,19,28,39,44,48 | none           | 23
  - r @9       | 4
  - r @19      | 4
  - w @23      | ########## | 28,32,39,44,48 | 4              | none
  - r @28      | 4,23
  - r @32      | 23
  - r @39      | 4,23
  - r @44      | 4,23
  - r @48      | 4,23
