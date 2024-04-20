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
let x___4__ = 0;
while (true) {
  /*8*/ x___14__ = x___12__ + 1;
  $(x___18__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 14
  - r @12      | 4,14
  - w @14      | ########## | 18,12       | 4              | none
  - r @18      | 14
