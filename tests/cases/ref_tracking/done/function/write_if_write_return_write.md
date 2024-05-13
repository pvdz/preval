# Preval test case

# write_if_write_return_write.md

> Ref tracking > Done > Function > Write if write return write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($) {
    x = $(2);
    return x;
  }
  $(x);
}
$(f);
`````

## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () {
  debugger;
  let x___10__ = 1;
  if ($) {
    /*14*/ x___20__ = $(2);
    return x___23__;
  } /*24*/ else {
    $(x___28__);
    return undefined___30__;
  }
};
$(f___34__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 34          | none           | none
  - r @34      | 4

x:
  - w @10      | ########## | 28          | none           | 20
  - w @20      | ########## | 23          | 10             | none
  - r @23      | 20
  - r @28      | 10
