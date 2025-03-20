# Preval test case

# write_if_return.md

> Ref tracking > Done > Function > Write if return
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    return
  }
  $(x);
}
$(f);
`````


## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () /*6*/ {
  debugger;
  let x___10__ = $(1);
  if ($) {
    /*16*/ return undefined___19__;
  } /*20*/ else {
    $(x___24__);
    return undefined___26__;
  }
};
$(f___30__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 30          | none           | none
  - r @30      | 4

x:
  - w @10      | ########## | 24          | none           | none
  - r @24      | 10
