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
/* stmt(3): */ let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___10__*/ x = 1;
    if ($) {
      /*14~17*/ /* stmt(15): */ return /*___17__*/ x;
    } /*18~30*/ else {
      /* stmt(19): */ /*___24__*/ x = $(2);
      /* stmt(25): */ $(/*___28__*/ x);
      /* stmt(29): */ return /*___30__*/ undefined;
    }
  };
/* stmt(31): */ $(/*___34__*/ f);
`````


## Todos triggered


None


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
