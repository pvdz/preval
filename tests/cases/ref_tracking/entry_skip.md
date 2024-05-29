# Preval test case

# entry_skip.md

> Ref tracking > Entry skip
>
> If a code path has an abrupt completion, how do we treat entryReads and
> entryWrites? Are we skipping them in some cases?
> The entry* should be propagated immediately when scheduling the continuation
> Or maybe just of blocks when traversal exits them (so not queue driven)

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  A: {
    x = 2; // should be marked as read by two reads, not one
    if ($) {
      $(x); // x=2
      break A;
    }
  }
  $(x); // x=1 2
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  x___12__ = 2;
  if ($) {
    /*15*/ $(x___19__);
    break A___21__;
  } /*22*/ else {
  }
}
$(x___26__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 26          | none           | 12
  - w @12      | ########## | 19,26       | 4              | none
  - r @19      | 12
  - r @26      | 4,12
