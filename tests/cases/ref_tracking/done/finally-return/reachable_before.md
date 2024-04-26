# Preval test case

# reachable_before.md

> Ref tracking > Done > Finally-return > Reachable before

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    if ($()) {
      return;
    }
    x = 2;
  } finally {
    $(x); // 1 or 2
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
      /*21*/ return undefined___24__;
    } /*25*/ else {
      x___29__ = 2;
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
  - w @10      | ########## | not read    | none           | none
  - w @29      | ########## | not read    | none           | none
  - r @34      | none (TDZ?)

tmpIfTest:
  - w @16      | ########## | 20          | none           | none
  - r @20      | 16
