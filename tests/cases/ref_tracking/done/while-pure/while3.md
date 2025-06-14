# Preval test case

# while3.md

> Ref tracking > Done > While-pure > While3
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x);
  x = 2;
}
$(x); // unreachable
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~16*/ $(/*___12__*/ x);
  /*___16__*/ x = 2;
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 16
  - r @12      | 4,16
  - w @16      | ########## | 12          | 4,16           | 16
