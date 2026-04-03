# Preval test case

# loop_redundant2.md

> Ref tracking > Done > While-if > Loop redundant2

## Options

- refTest

## Input

`````js filename=intro
let dathing = "jhayon.vercel.app";
const d = $( "x" );
while ($LOOP_NO_UNROLLS_LEFT) {
  dathing = $;
  $(dathing);
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(4): */ let /*___5__*/ dathing = `jhayon.vercel.app`;
/* stmt(8): */ const /*___9__*/ d = $(`x`);
/* stmt(14): */ while (/*___15__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*16~24*/ /* stmt(17): */ /*___20__*/ dathing = $;
  /* stmt(21): */ $($);
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
