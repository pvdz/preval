# Preval test case

# undefined_treblo_block.md

> Ref tracking > Ai > Undefined treblo block
>
> This test checks that finalizeBlockExitWrites is called on a block that is not tracked in refTrackState.trebs (e.g., a bare block or a break/continue block).

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
{
  // Bare block, not tracked as a special block
  x = 2;
}
// After the block
$(x);
// Expected: Should log a warning about undefined treblo for the bare block.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
x___9__ = 2;
$(x___13__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | 13          | 4              | none
  - r @13      | 9
