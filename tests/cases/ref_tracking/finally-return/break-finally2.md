# Preval test case

# break-finally2.md

> Ref tracking > Done > Finally-return > Break-finally2

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
      if ($()) {
        x = 3;
      }
    }

    // Dead code (not relevant to ref test)
    //$(x);
    //x = 4;
  }
  
  $(x); // 2 or 3
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
    const tmpIfTest___27__ = $();
    if (tmpIfTest___31__) {
      /*32*/ x___36__ = 3;
    } /*37*/ else {
    }
  }
}
$(x___41__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 41          | none           | none
  - w @17      | ########## | not read    | none           | none
  - r @24      | none (TDZ?)
  - w @36      | ########## | not read    | none           | none
  - r @41      | 4

tmpIfTest:
  - w @27      | ########## | 31          | none           | none
  - r @31      | 27
