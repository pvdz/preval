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
c___11__ = c___9__ + 1;
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
c:
  - w @4       | ########## | 9           | none           | 11
  - r @9       | 4
  - w @11      | ########## | not read    | 4              | none
