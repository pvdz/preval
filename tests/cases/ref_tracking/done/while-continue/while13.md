# Preval test case

# while13.md

> Ref tracking > Done > While-continue > While13
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
    x = 5;
    continue;
  } else {
    x = 4;
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
        x___31__ = 5;
        break $continue___33__;
      } /*34*/ else {
        x___38__ = 4;
        x___42__ = 3;
      }
    }
  } /*43*/ else {
    break;
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27          | none           | 31,38
  - r @27      | 4,31,42
  - w @31      | ########## | 27          | 4,31,42        | 31,38
  - w @38      | ########## | not read    | 4,31,42        | 42
  - w @42      | ########## | 27          | 38             | 31,38

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
