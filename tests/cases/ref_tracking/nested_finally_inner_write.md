# Preval test case

# nested_finally_inner_write.md

> Ref tracking > Nested finally inner write
> 
> Regression where the x=2 write would not overwrite but 
> amend to the inner Try.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);        // x=1
} finally {
  $(x);        // x=1
  x = 2;
  try {
    $(x);      // x=2
  } finally {
    $(x);      // x=2
  }
}
$(x);          // x=2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
} finally /*12*/ {
  $(x___16__);
  x___20__ = 2;
  try /*22*/ {
    $(x___26__);
  } finally /*27*/ {
    $(x___31__);
  }
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,16       | none           | 20
  - r @11      | 4
  - r @16      | 4
  - w @20      | ########## | 26,31,35    | 4              | none
  - r @26      | 20
  - r @31      | 20
  - r @35      | 20
