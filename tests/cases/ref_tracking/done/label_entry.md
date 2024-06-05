# Preval test case

# label_entry.md

> Ref tracking > Done > Label entry
>
> Exposing that entryWrites don't overwrite themselves if the parent
> had already overwritten the binding.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  A: {
    $(x);
    x = 3; // Does not overwrite itself
    break A;
  }
}
$(x); // unreachable
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  $(x___16__);
  x___20__ = 3;
}
$(x___24__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 16          | 4,20           | 20
  - r @16      | 12
  - w @20      | ########## | not read    | 12             | 12
  - r @24      | none (unreachable?)
