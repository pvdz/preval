# Preval test case

# let_assign_rt2.md

> Try escaping > Let assign rt2

There was a bug in ref tracking where the final read of x was found to
only be able to reach the assignment to x, not the var decl init.

## Options

- refTest

## Input

`````js filename=intro
let x = undefined;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $('before');
    x = $(1);
    if (x) break;
  } catch {
    $('fail');
  }
}
$(x);  // <-- x can reach both writes, not just the assign
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = undefined___5__;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___7__) {
  /*8*/ try /*10*/ {
    $(`before`);
    x___21__ = $(1);
    if (x___23__) {
      /*24*/ break;
    } /*26*/ else {
    }
  } catch (e___28__) /*29*/ {
    $(`fail`);
  }
}
$(x___38__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 21
  - w @21      | ########## | 23,38       | 4,21           | 21
  - r @23      | 21
  - r @38      | 21

e:
  - w @28      | ########## | not read    | none           | none
