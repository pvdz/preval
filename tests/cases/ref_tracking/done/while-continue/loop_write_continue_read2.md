# Preval test case

# loop_write_continue_read2.md

> Ref tracking > Done > While-continue > Loop write continue read2
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  if (x < 400) continue;
  $(x);
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
    const tmpIfTest___20__ = x___22__ < 400;
    if (tmpIfTest___25__) {
      /*26*/ break $continue___28__;
    } /*29*/ else {
      $(x___33__);
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
  - w @18      | ########## | 16,22,33    | 4,18           | 18
  - r @22      | 18
  - r @33      | 18

tmpIfTest:
  - w @20      | ########## | 25          | none           | none
  - r @25      | 20
