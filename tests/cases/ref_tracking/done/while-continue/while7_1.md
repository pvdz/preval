# Preval test case

# while7_1.md

> Ref tracking > Done > While-continue > While7 1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x); // x=1 2
    continue;
  } else {
    $(x); // x=1 2
    x = 2;
  }
  if ($()) break;
}
$(x); // x=1 2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
    continue;
  } /*17*/ else {
    $(x___21__);
    x___25__ = 2;
    const tmpIfTest___28__ = $();
    if (tmpIfTest___32__) {
      /*33*/ break;
    } /*35*/ else {
    }
  }
}
$(x___39__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21,39    | none           | 25
  - r @15      | 4,25
  - r @21      | 4,25
  - w @25      | ########## | 15,21,39    | 4,25           | 25
  - r @39      | 4,25

tmpIfTest:
  - w @28      | ########## | 32          | none           | none
  - r @32      | 28
