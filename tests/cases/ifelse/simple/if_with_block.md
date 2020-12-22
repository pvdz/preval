# Preval test case

# if_with_block.md

> ifelse > simple > if_with_block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) {
  $();
}
`````

## Normalized

`````js filename=intro
if (true) {
  $();
}
`````

## Output

`````js filename=intro
{
  $();
}
`````
