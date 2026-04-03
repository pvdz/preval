# Preval test case

# loop_boundary_base_if.md

> Ref tracking > Done > While-if > Loop boundary base if

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($) $(x);
  break;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 5;
/* stmt(6): */ if ($) {
  /*8~16*/ /* stmt(9): */ $(/*___12__*/ x);
  /* stmt(13): */ $(/*___16__*/ x);
} /*17~21*/ else {
  /* stmt(18): */ $(/*___21__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,16,21    | none           | none
  - r @12      | 4
  - r @16      | 4
  - r @21      | 4
