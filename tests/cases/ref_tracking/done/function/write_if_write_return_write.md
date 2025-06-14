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
let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___10__*/ x = 1;
    if ($) {
      /*14~23*/ /*___20__*/ x = $(2);
      return /*___23__*/ x;
    } /*24~30*/ else {
      $(/*___28__*/ x);
      return /*___30__*/ undefined;
    }
  };
$(/*___34__*/ f);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 34          | none           | none
  - r @34      | 4

x:
  - w @10      | ########## | 28          | none           | 20
  - w @20      | ########## | 23          | 10             | none
  - r @23      | 20
  - r @28      | 10
