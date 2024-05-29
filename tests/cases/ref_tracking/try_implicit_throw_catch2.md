# Preval test case

# try_implicit_throw_catch2.md

> Ref tracking > Try implicit throw catch2
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
      $();        // if this throws x remains 1
      x = 2;
    } finally {
      $();
    }
  } catch {
    // this catch is the only reason why x=1 _can_ be observed
    $(x); // x=1 3
  }
  $(x); // x=1 3
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
try /*11*/ {
  try /*13*/ {
    $();
    x___20__ = 2;
  } finally /*21*/ {
    $();
  }
} catch (e___26__) /*27*/ {
  $(x___31__);
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,31,35     | none           | 20
  - r @9       | 4
  - w @20      | ########## | 31,35       | 4              | none
  - r @31      | 4,20
  - r @35      | 4,20
