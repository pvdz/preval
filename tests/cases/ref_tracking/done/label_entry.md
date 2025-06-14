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
let /*___4__*/ x = 1;
while (true) {
  /*8~20*/ /*___12__*/ x = 2;
  $(/*___16__*/ x);
  /*___20__*/ x = 3;
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 16          | 4,20           | 20
  - r @16      | 12
  - w @20      | ########## | not read    | 12             | 12
