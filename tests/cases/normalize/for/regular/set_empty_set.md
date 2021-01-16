# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (a; ; c) d;
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  a;
  while (true) {
    d;
    c;
  }
}
`````

## Output

`````js filename=intro
while (true) {}
`````
