# Preval test case

# while_entry.md

> Ref tracking > Done > While-break > While entry
>
> Exposing that entryWrites don't overwrite themselves if the parent
> had already overwritten the binding.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;    // unobservable
while (true) {
  x = 2;      // unobservable
  while (true) {
    x = 3;    // Does not overwrite itself
    if ($) break;
    x = 4;    // unobservable
  }
  $(x);       // x=3
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  while (true) {
    /*15*/ x___19__ = 3;
    if ($) {
      /*22*/ break;
    } /*24*/ else {
      x___28__ = 4;
    }
  }
  $(x___32__);
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4,19           | 19
  - w @19      | ########## | 32          | 12,28          | 12,28
  - w @28      | ########## | not read    | 19             | 19
  - r @32      | 19
