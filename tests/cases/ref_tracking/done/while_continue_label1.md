# Preval test case

# while_continue_label1.md

> Ref tracking > Done > While continue label1
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
      $(x); // 1 2
    } else {
      $(x); // 1 2
      x = 2;
      continue again;
    }
  }
  // the loop never breaks and the continue always skips over this. 
  // if anything it's unreachable and should be eliminated
  $(x); // should not be able to read 2
}
$(x); // 1 2 (but unreachable)
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
  - r @20      | 4,29
  - r @25      | 4,29
  - w @29      | ########## | 20,25,35    | 4,29           | 29
  - r @35      | 4,29
  - r @39      | 4
