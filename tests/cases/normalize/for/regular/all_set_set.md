# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
for (let b = 2, c = 3, d = 4; b; ) d;
`````

## Normalized

`````js filename=intro
{
  let b = 2;
  let c = 3;
  let d = 4;
  while (b) {
    d;
  }
}
`````

## Output

`````js filename=intro
while (2) {}
`````
