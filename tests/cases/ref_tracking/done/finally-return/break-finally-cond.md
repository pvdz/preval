# Preval test case

# break-finally-cond.md

> Ref tracking > Done > Finally-return > Break-finally-cond

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      if ($) {
        x = 2;
        break here;
      }
      x = 3;
    } finally {
      // x=1 when $ is not defined (crash)
      // x=2 when $ is truthy
      // x=3 when $ is falsy
      $(x); // x=1 2 3
    }

    $(x); // x=3 (only!)
    x = 4;
  }
  
  $(x); // x=2 4 (because 1 is a crash so 1 skips this)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  try /*10*/ {
    if ($) {
      /*13*/ x___17__ = 2;
      break here___19__;
    } /*20*/ else {
      x___24__ = 3;
    }
  } finally /*25*/ {
    $(x___29__);
  }
  $(x___33__);
  x___37__ = 4;
}
$(x___41__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | 17,24
  - w @17      | ########## | 29,41       | 4              | none
  - w @24      | ########## | 29,33       | 4              | 37
  - r @29      | 4,17,24
  - r @33      | 24
  - w @37      | ########## | 41          | 24             | none
  - r @41      | 17,37
