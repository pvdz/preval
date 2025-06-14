# Preval test case

# while_yes_reftest.md

> Ref tracking > Last write analysis > While yes reftest
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Options

- refTest

## Input

`````js filename=intro
// Should be able to rename the binding since this write can only be observed by the next read
let x = $('a');
$(x);
// Can not SSA this because the loop writes to it, too
x = $('b');
while (true) {
  if (x) {
    x = $(0);
  } else {
    break;  
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = $(`a`);
$(/*___12__*/ x);
/*___19__*/ x = $(`b`);
while (true) {
  /*22~33*/ if (/*___24__*/ x) {
    /*25~31*/ /*___31__*/ x = $(0);
  } /*32~33*/ else {
    break;
  }
}
$(/*___37__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 19
  - r @12      | 4
  - w @19      | ########## | 24,37       | 4              | 31
  - r @24      | 19,31
  - w @31      | ########## | 24,37       | 19,31          | 31
  - r @37      | 19,31
