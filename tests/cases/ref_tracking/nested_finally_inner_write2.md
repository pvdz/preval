# Preval test case

# nested_finally_inner_write2.md

> Ref tracking > Nested finally inner write2
> 
> Regression where the x=2 write would not overwrite but 
> amend to the inner Try.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
A: {
  try {
    $(x);        // x=1
  } finally {
    $(x);        // x=1
    if ($1) {
      x = 2;
      break A;
    }
    try {
      $(x);      // x=1
    } finally {
      $(x);      // x=1
    }
  }
}
$(x);          // x=1 2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  try /*10*/ {
    $(x___14__);
  } finally /*15*/ {
    $(x___19__);
    if ($1) {
      /*22*/ x___26__ = 2;
      break A___28__;
    } /*29*/ else {
      try /*31*/ {
        $(x___35__);
      } finally /*36*/ {
        $(x___40__);
      }
    }
  }
}
$(x___44__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14,19,35,40,44 | none           | 26
  - r @14      | 4
  - r @19      | 4
  - w @26      | ########## | 44          | 4              | none
  - r @35      | 4
  - r @40      | 4
  - r @44      | 4,26
