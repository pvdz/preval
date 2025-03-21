# Preval test case

# entry_skip.md

> Ref tracking > Done > Entry skip

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  A: {
    x = 2;
    if ($) {
      $(x); // x=2
      break A;
    }
  }
  $(x); // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  x___12__ = 2;
  if ($) {
    /*15*/ $(x___19__);
    break A___21__;
  } /*22*/ else {
  }
}
$(x___26__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 19,26       | 4              | none
  - r @19      | 12
  - r @26      | 12
