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
let /*___4__*/ x = 1;
if ($) {
  /*8~21*/ $(/*___12__*/ x, 2);
  /*___17__*/ x = 10;
  $(/*___21__*/ x);
} /*22~27*/ else {
  $(/*___26__*/ x, 3);
}
/*___31__*/ x = 4;
$(/*___35__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,26       | none           | 17,31
  - r @12      | 4
  - w @17      | ########## | 21          | 4              | 31
  - r @21      | 17
  - r @26      | 4
  - w @31      | ########## | 35          | 4,17           | none
  - r @35      | 31
