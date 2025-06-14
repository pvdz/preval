# Preval test case

# loop_boundary4.md

> Ref tracking > Done > While-if > Loop boundary4
>
> This case is for the conditional break where the body always overwrites

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  x = 6;
  $(x); // 6
  if ($) {
    break;
  }
}
$(x); // 6
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 5;
while (true) {
  /*8~21*/ /*___12__*/ x = 6;
  $(/*___16__*/ x);
  if ($) {
    /*19~20*/ break;
  } /*21~21*/ else {
  }
}
$(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 16,25       | 4,12           | 12
  - r @16      | 12
  - r @25      | 12
