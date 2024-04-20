# Preval test case

# break-finally.md

> Ref tracking > Done > Finally-return > Break-finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      if ($()) {
        x = 2;
        break here;
      }
      x = 3;
    } finally {
      $(x); // 1 or 2
    }

    $(x); // 3 
    x = 4;
  }
  
  $(x); // 2 or 4
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  try /*10*/ {
    $();
    x___17__ = 2;
    break here___19__;
  } finally /*20*/ {
    $(x___24__);
    x___28__ = 3;
  }
  $(x___32__);
  x___36__ = 4;
}
$(x___40__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24          | none           | 17,28
  - w @17      | ########## | 24          | 4              | 28
  - r @24      | 4,17
  - w @28      | ########## | 32          | 4,17           | 36
  - r @32      | 28
  - w @36      | ########## | 40          | 28             | none
  - r @40      | 36
