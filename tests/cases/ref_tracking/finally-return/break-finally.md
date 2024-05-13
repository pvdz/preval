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
  
  $(x); // 3 (only)
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
  - w @4       | ########## | 32          | none           | none
  - w @17      | ########## | not read    | none           | none
  - r @24      | none (TDZ?)
  - w @28      | ########## | not read    | none           | none
  - r @32      | 4
