# Preval test case

# try_finally.md

> Ref tracking > Done > Finally-return > Try finally

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    if ($()) {
      x = 2;
      return 100;
    }
  } finally {
    $(x); // can see 1 2
  }
}
$(f);
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
  - w @25      | ########## | 34          | 10             | none
  - r @34      | 10,25

tmpIfTest:
  - w @16      | ########## | 20          | none           | none
  - r @20      | 16
