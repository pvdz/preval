# Preval test case

# if5.md

> Ref tracking > Done > If-pure > If5
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x, 2); // entryRead
    x = 10; // entryWrite
    $(x); // --
  } else {
    $(x, 3); // entryRead
  }
  x = 4; // exitWrite
  $(x); // --
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ $(x___12__, 2);
  x___17__ = 10;
  $(x___21__);
} /*22*/ else {
  $(x___26__, 3);
}
x___31__ = 4;
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,26       | none           | 17,31
  - r @12      | 4
  - w @17      | ########## | 21          | 4              | none
  - r @21      | 17
  - r @26      | 4
  - w @31      | ########## | 35          | 4              | none
  - r @35      | 31
