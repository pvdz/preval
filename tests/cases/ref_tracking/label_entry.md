# Preval test case

# label_entry.md

> Ref tracking > Label entry
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
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  A___14__: /*15*/ {
    $(x___19__);
    x___23__ = 3;
    break A___25__;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | 12
  - w @12      | ########## | 19          | 4,23           | 23
  - r @19      | 12
  - w @23      | ########## | not read    | 12             | 12
  - r @29      | 4
