# Preval test case

# missing_expr2.md

> Tofix > Missing expr2
>
> The very last $(x) is missing in the else branch

todo:
- the first "20,30" case can inline x=20 in the else branch in the output (it doesn't at the time of writing)

## Options

- refTest

## Input

`````js filename=intro
let x = 20;
$(20);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(20);
  x = 30;
  $(30);
} else {
  $(x);
}
const tmpIfTest$1 = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
} else {
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 20;
$(20);
const tmpIfTest___12__ = $(1);
if (tmpIfTest___17__) {
  /*18*/ $(20);
  x___26__ = 30;
  $(30);
} /*31*/ else {
  $(x___35__);
}
const tmpIfTest$1___38__ = $(2);
$(x___45__);
if (tmpIfTest$1___47__) {
  /*48*/ $(40);
} /*53*/ else {
}
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 35,45       | none           | 26
  - w @26      | ########## | 45          | 4              | none
  - r @35      | 4
  - r @45      | 4,26

tmpIfTest:
  - w @12      | ########## | 17          | none           | none
  - r @17      | 12

tmpIfTest$1:
  - w @38       | ########## | 47          | none           | none
  - r @47       | 38
