# Preval test case

# loop_boundary5.md

> Ref tracking > Done > While-if > Loop boundary5
>
> For the case where the branch containing the `breka` conditionally writes it

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  $(x); // 5, not 6
  if ($) {
    if ($(false)) {
      x = 6;
    }
    break;
  }
}
$(x); // 5 or 6
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
while (true) {
  /*8*/ $(x___12__);
  if ($) {
    /*15*/ const tmpIfTest___18__ = $(false);
    if (tmpIfTest___23__) {
      /*24*/ x___28__ = 6;
    } /*29*/ else {
    }
    break;
  } /*31*/ else {
  }
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,35       | none           | 28
  - r @12      | 4
  - w @28      | ########## | not read    | 4              | none
  - r @35      | 4

tmpIfTest:
  - w @18      | ########## | 23          | none           | none
  - r @23      | 18
