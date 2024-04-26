# Preval test case

# loop_increment.md

> Ref tracking > Done > While-if > Loop increment
>
> The increment is never observed because the loop breaks
> The algo detects this properly.

## Options

- refTest

## Input

`````js filename=intro
{
  let c = 1;
  while ($LOOP_UNROLL_500) {
    c = c + 1;
    break;
  }
}
`````

## Output

(Annotated with pids)

`````filename=intro
let c___4__ = 1;
while ($LOOP_UNROLL_500___7__) {
  /*8*/ c___14__ = c___12__ + 1;
  break;
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
c:
  - w @4       | ########## | not read    | none           | none
  - r @12      | none (TDZ?)
  - w @14      | ########## | not read    | none           | none
