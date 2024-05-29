# Preval test case

# label_finally_finally_if_true_break_single_read3.md

> Ref tracking > Label finally finally if true break single read3
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
  x = 3;
  try {
    x = 4;
    break back;
  } finally {
    x = 5;
  }
  x = 6;
}
$(x); // x=5 6
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  x___12__ = 3;
  try /*14*/ {
    x___18__ = 4;
    break back___20__;
  } finally /*21*/ {
    x___25__ = 5;
  }
  x___29__ = 6;
}
$(x___33__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4              | 18,25,29
  - w @18      | ########## | not read    | 12             | 25
  - w @25      | ########## | 33          | 12,18          | none
  - w @29      | ########## | 33          | 12             | none
  - r @33      | 25,29
