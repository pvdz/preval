# Preval test case

# loop_redundant2.md

> Ref tracking > Done > While-if > Loop redundant2

## Options

- refTest

## Input

`````js filename=intro
let dathing = "jhayon.vercel.app";
const d = $( "x" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  dathing = $;
  $(dathing);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let dathing___4__ = `jhayon.vercel.app`;
const d___9__ = $(`x`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___15__) {
  /*16*/ dathing___20__ = $;
  $(dathing___24__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
dathing:
  - w @4       | ########## | not read    | none           | 20
  - w @20      | ########## | 24          | 4              | none
  - r @24      | 20

d:
  - w @9       | ########## | not read    | none           | none
