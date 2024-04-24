# Preval test case

# while_continue_label1.md

> Ref tracking > While continue label1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
again: while (true) {
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      continue again;
    }
  }
  $(x); // Does not read 2
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
again___7__: while (true) {
  /*10*/ while (true) {
    /*13*/ if ($) {
      /*16*/ $(x___20__);
    } /*21*/ else {
      $(x___25__);
      x___29__ = 2;
      continue again___31__;
    }
  }
  $(x___35__);
}
$(x___39__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 20,25,35,39 | none           | 29
  - r @20      | 4
  - r @25      | 4
  - w @29      | ########## | not read    | 4              | none
  - r @35      | 4
  - r @39      | 4
