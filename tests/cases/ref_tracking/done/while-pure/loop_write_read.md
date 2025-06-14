# Preval test case

# loop_write_read.md

> Ref tracking > Done > While-pure > Loop write read
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 0;
while (true) {
  /*8~18*/ /*___14__*/ x = /*___12__*/ x + 1;
  $(/*___18__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 14
  - r @12      | 4,14
  - w @14      | ########## | 12,18       | 4,14           | 14
  - r @18      | 14
