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
    $(x);     // x=1 2
    continue;
  } else {
    $(x);     // x=1 2
    x = 2;
  }
  if ($()) break;
}
$(x);         // x=2 (it has to go through x=2 if it is to reach the break)
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $continue___10__: /*11*/ {
    if ($) {
      /*14*/ $(x___18__);
      break $continue___20__;
    } /*21*/ else {
      $(x___25__);
      x___29__ = 2;
      const tmpIfTest___32__ = $();
      if (tmpIfTest___36__) {
        /*37*/ break;
      } /*39*/ else {
      }
    }
  }
}
$(x___43__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,25       | none           | 29
  - r @18      | 4,29
  - r @25      | 4,29
  - w @29      | ########## | 18,25,43    | 4,29           | 29
  - r @43      | 29

tmpIfTest:
  - w @32      | ########## | 36          | none           | none
  - r @36      | 32
