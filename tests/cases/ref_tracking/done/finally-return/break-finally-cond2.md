# Preval test case

# break-finally-cond2.md

> Ref tracking > Done > Finally-return > Break-finally-cond2

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  try {
    x = 2;
  } finally {
    $(x); // x=1 2 (not sure how 1 could occur but for the sake of argument we assume the try block can throw anywhere)
  }

  $(x); // x=2 (only!)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
} finally /*12*/ {
  $(x___16__);
}
$(x___20__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | 11
  - w @11      | ########## | 16,20       | 4              | none
  - r @16      | 4,11
  - r @20      | 11
