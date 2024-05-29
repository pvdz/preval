# Preval test case

# while1_3.md

> Ref tracking > Done > While-break > While1 3
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x); // x=1 2
  if ($) {
    x = 2;
    continue;
  } else {
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
    if ($) {
      /*18*/ x___22__ = 2;
      continue;
    } /*24*/ else {
      const tmpIfTest___27__ = $();
      if (tmpIfTest___31__) {
        /*32*/ break;
      } /*34*/ else {
      }
    }
  } /*35*/ else {
    break;
  }
}
$(x___40__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,40       | none           | 22
  - r @15      | 4,22
  - w @22      | ########## | 15,40       | 4,22           | 22
  - r @40      | 4,22

tmpIfTest:
  - w @27      | ########## | 31          | none           | none
  - r @31      | 27
