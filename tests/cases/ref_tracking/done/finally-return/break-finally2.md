# Preval test case

# finally_wrapping_function.md

> Ref tracking > Done > Finally-return > Finally wrapping function

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
let f___4__ = function () {
  debugger;
  let x___10__ = 1;
  try /*13*/ {
    const tmpIfTest___16__ = $();
    if (tmpIfTest___20__) {
      /*21*/ x___25__ = 2;
      return 100;
    } /*29*/ else {
    }
  } finally /*30*/ {
    $(x___34__);
  }
  return undefined___36__;
};
$(f___40__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 40          | none           | none
  - r @40      | 4

x:
  - w @10      | ########## | 34          | none           | 25
  - w @25      | ########## | not read    | 10             | none
  - r @34      | 10

tmpIfTest:
  - w @16      | ########## | 20          | none           | none
  - r @20      | 16
