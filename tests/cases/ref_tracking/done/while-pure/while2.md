# Preval test case

# while2.md

> Ref tracking > Done > While-pure > While2
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $(x___12__);
}
$(x___16__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | none
  - r @12      | 4
  - r @16      | none (unreachable?)
