# Preval test case

# label_finally_finally_if_true_break_single_read4.md

> Ref tracking > Label finally finally if true break single read4
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    break back;
  } finally {
  }
  x = 6;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  try /*10*/ {
    break back___12__;
  } finally /*13*/ {
  }
  x___17__ = 6;
}
$(x___21__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | 17
  - w @17      | ########## | 21          | 4              | none
  - r @21      | 4,17
