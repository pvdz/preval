# Preval test case

# if_entry.md

> Ref tracking > Done > If-pure > If entry
>
> Expose the case why if/else must only propagate entryReads/entryWrites
> when the parent does not overwrite it yet. If you don't check this
> then x=3 is considered to overwrite itself too, which is not possible.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
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
  if ($1) {
    /*15*/ $(x___19__);
  } /*20*/ else {
    $(x___24__);
    x___28__ = 3;
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 19,24       | 4,12,28        | 12,28
  - r @19      | 12
  - r @24      | 12
  - w @28      | ########## | not read    | 12             | 12
