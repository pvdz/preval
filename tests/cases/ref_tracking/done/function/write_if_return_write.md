# Preval test case

# write_if_return_write.md

> Ref tracking > Done > Function > Write if return write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($) {
    return x;
  } else {
    x = $(2);
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
  let x___10__ = 1;
  if ($) {
    /*14*/ return x___17__;
  } /*18*/ else {
    x___24__ = $(2);
    $(x___28__);
    return undefined___30__;
  }
};
$(f___34__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 34          | none           | none
  - r @34      | 4

x:
  - w @10      | ########## | 17          | none           | 24
  - r @17      | 10
  - w @24      | ########## | 28          | 10             | none
  - r @28      | 24
