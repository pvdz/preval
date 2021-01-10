# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
for (var a = 1; ; ) d;
`````

## Normalized

`````js filename=intro
var a;
let b = 2;
let c = 3;
let d = 4;
{
  a = 1;
  while (true) {
    d;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = 8;
var x = 8;
{
  var x = 8;
  while (x) {
    x;
  }
}
`````

## Output

`````js filename=intro
var a;
a = 1;
while (true) {}
`````
