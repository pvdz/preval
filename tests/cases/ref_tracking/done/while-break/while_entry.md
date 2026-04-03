# Preval test case

# while_entry.md

> Ref tracking > Done > While-break > While entry
>
> Exposing that entryWrites don't overwrite themselves if the parent
> had already overwritten the binding.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;    // unobservable
while (true) {
  x = 2;      // unobservable
  while (true) {
    x = 3;    // Does not overwrite itself
    if ($) break;
    x = 4;    // unobservable
  }
  $(x);       // x=3
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~32*/ /* stmt(9): */ /*___12__*/ x = 2;
  /* stmt(13): */ while (true) {
    /*15~28*/ /* stmt(16): */ /*___19__*/ x = 3;
    /* stmt(20): */ if ($) {
      /*22~23*/ /* stmt(23): */ break;
    } /*24~28*/ else {
      /* stmt(25): */ /*___28__*/ x = 4;
    }
  }
  /* stmt(29): */ $(/*___32__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4,19           | 19
  - w @19      | ########## | 32          | 12,28          | 12,28
  - w @28      | ########## | not read    | 19             | 19
  - r @32      | 19
