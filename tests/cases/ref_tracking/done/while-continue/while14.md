# Preval test case

# while14.md

> Ref tracking > Done > While-continue > While14
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    $(x);
    continue;
  } else {
  }
  if ($) {
    $(x);
    x = 6;
    break;
  }
  x = 3;
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      const tmpIfTest___17__ = $(false);
      if (tmpIfTest___22__) {
        /*23*/ $(x___27__);
        break $continue___29__;
      } /*30*/ else {
        if ($) {
          /*33*/ $(x___37__);
          x___41__ = 6;
          break;
        } /*43*/ else {
          x___47__ = 3;
        }
      }
    }
  } /*48*/ else {
    break;
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,37       | none           | 41,47
  - r @27      | 4,47
  - r @37      | 4,47
  - w @41      | ########## | not read    | 4,47           | none
  - w @47      | ########## | 27,37       | 4,47           | 41,47

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
