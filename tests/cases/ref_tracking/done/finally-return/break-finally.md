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
      $(); // "may fail"
      x = 2;
      break here;
    } finally {
      $(x); // 1 or 2
      x = 3;
    }

    // Dead code (we could detect this)
    //$(x);
    //x = 4;
  }
  
  $(x); // 3 (only, but because DCE is not applied yet, it'll also read 1)
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
}
$(x___32__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24,32       | none           | 17,28
  - w @17      | ########## | 24          | 4              | 28
  - r @24      | 4,17
  - w @28      | ########## | 32          | 4,17           | none
  - r @32      | 4,28
