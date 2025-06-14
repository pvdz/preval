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
let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___10__*/ x = $(1);
    if ($) {
      /*16~19*/ return /*___19__*/ undefined;
    } /*20~26*/ else {
      $(/*___24__*/ x);
      return /*___26__*/ undefined;
    }
  };
$(/*___30__*/ f);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 30          | none           | none
  - r @30      | 4

x:
  - w @10      | ########## | 24          | none           | none
  - r @24      | 10
