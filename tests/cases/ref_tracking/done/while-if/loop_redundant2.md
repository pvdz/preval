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
let dathing___5__ = `jhayon.vercel.app`;
const d___9__ = $(`x`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___15__) {
  /*16*/ dathing___20__ = $;
  $($);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
dathing:
  - w @5       | ########## | not read    | none           | 20
  - w @20      | ########## | not read    | 5,20           | 20

d:
  - w @9       | ########## | not read    | none           | none
