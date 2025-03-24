# Preval test case

# loop_write_continue_read.md

> Ref tracking > Done > While-continue > Loop write continue read
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  if (x < 4) continue;
  $(x, 2);
  break;
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 0;
while (true) {
  /*8*/ $continue___10__: /*11*/ {
    x___18__ = x___16__ + 1;
    $(x___22__, 1);
    const tmpIfTest___25__ = x___27__ < 4;
    if (tmpIfTest___30__) {
      /*31*/ break $continue___33__;
    } /*34*/ else {
      $(x___38__, 2);
      break;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | 18
  - r @16      | 4,18
  - w @18      | ########## | 16,22,27,38 | 4,18           | 18
  - r @22      | 18
  - r @27      | 18
  - r @38      | 18

tmpIfTest:
  - w @25      | ########## | 30          | none           | none
  - r @30      | 25
