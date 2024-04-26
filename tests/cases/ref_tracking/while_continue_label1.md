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
  - w @4       | ########## | 39          | none           | none
  - r @20      | none (TDZ?)
  - r @25      | none (TDZ?)
  - w @29      | ########## | not read    | none           | none
  - r @35      | none (TDZ?)
  - r @39      | 4
