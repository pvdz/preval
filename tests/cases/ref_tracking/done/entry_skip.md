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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ A: /*8~22*/ {
  /* stmt(9): */ /*___12__*/ x = 2;
  /* stmt(13): */ if ($) {
    /*15~21*/ /* stmt(16): */ $(/*___19__*/ x);
    /* stmt(20): */ break /*___21__*/ A;
  } /*22~22*/ else {
  }
}
/* stmt(23): */ $(/*___26__*/ x);
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
