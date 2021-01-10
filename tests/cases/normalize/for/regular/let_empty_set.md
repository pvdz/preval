# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
for (let a = 1; ; c) d;
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
{
  let a = 1;
  while (true) {
    d;
    c;
  }
}
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = 8;
var x = 8;
{
  var x = 8;
  while (x) {
    x;
    x;
  }
}
`````

## Output

`````js filename=intro
while (true) {}
`````
