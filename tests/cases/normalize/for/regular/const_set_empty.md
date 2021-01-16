# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
for (const a = 1; b; c) d;
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
{
  const a = 1;
  while (b) {
    d;
    c;
  }
}
`````

## Output

`````js filename=intro
while (2) {}
`````
