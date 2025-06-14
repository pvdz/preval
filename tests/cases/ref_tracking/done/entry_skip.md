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
let /*___4__*/ x = 1;
/*___7__*/ A: /*8~22*/ {
  /*___12__*/ x = 2;
  if ($) {
    /*15~21*/ $(/*___19__*/ x);
    break /*___21__*/ A;
  } /*22~22*/ else {
  }
}
$(/*___26__*/ x);
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
