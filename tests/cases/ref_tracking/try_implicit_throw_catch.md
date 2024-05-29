# Preval test case

# try_implicit_throw_catch.md

> Ref tracking > Try implicit throw catch
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
      $();
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    x = 3;
  } catch {
    $(x); // x=1 2 3
    // What if we do x=4 here?
  }
  $(x); // x=1 2 3
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
    $(x___25__);
  }
  x___29__ = 3;
} catch (e___31__) /*32*/ {
  $(x___36__);
}
$(x___40__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,25,36,40  | none           | 20
  - r @9       | 4
  - w @20      | ########## | 25,36,40    | 4              | 29
  - r @25      | 4,20
  - w @29      | ########## | 36,40       | 20             | none
  - r @36      | 4,20,29
  - r @40      | 4,20,29
