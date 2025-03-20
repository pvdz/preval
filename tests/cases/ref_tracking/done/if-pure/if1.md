# Preval test case

# if1.md

> Ref tracking > Done > If-pure > If1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  $(x, 2);
} else {
  $(x, 3);
}
x = 4; // overwrites 1
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ $(x___12__, 2);
} /*14*/ else {
  $(x___18__, 3);
}
x___23__ = 4;
$(x___27__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,18       | none           | 23
  - r @12      | 4
  - r @18      | 4
  - w @23      | ########## | 27          | 4              | none
  - r @27      | 23
