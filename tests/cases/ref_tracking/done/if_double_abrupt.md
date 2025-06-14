# Preval test case

# if_double_abrupt.md

> Ref tracking > Done > If double abrupt

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
foo: {
  x = 2;
  if ($1) {
    x = 3;
    break foo;
  } else {
    x = 4;
    break foo;
  }
  $(x);  // unreachable, but shouldn't reference 3 or 4 as it gets scheduled to the foo label parent
  x = 5; // unreachable
}
$(x); // 3 or 4
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ foo: /*8~28*/ {
  /*___12__*/ x = 2;
  if ($1) {
    /*15~21*/ /*___19__*/ x = 3;
    break /*___21__*/ foo;
  } /*22~28*/ else {
    /*___26__*/ x = 4;
    break /*___28__*/ foo;
  }
}
$(/*___32__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4              | 19,26
  - w @19      | ########## | 32          | 12             | none
  - w @26      | ########## | 32          | 12             | none
  - r @32      | 19,26
