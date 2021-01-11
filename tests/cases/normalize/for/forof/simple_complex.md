# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
for (a of $({x: 1, y: 2})) $(a);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a;
{
  tmpArg = { x: 1, y: 2 };
  const tmpForOfRhs = $(tmpArg);
  for (a of tmpForOfRhs) {
    $(a);
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
{
  x = { x: 8, x: 8 };
  var x = x(x);
  for (x of x) {
    x(x);
  }
}
`````

## Output

`````js filename=intro
var tmpArg;
let a;
tmpArg = { x: 1, y: 2 };
const tmpForOfRhs = $(tmpArg);
for (a of tmpForOfRhs) {
  $(a);
}
`````
