# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
for (a in $({x: 1, y: 2})) $(a);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a;
{
  tmpArg = { x: 1, y: 2 };
  const tmpForInRhs = $(tmpArg);
  for (a in tmpForInRhs) {
    $(a);
  }
}
`````

## Output

`````js filename=intro
var tmpArg;
let a;
tmpArg = { x: 1, y: 2 };
const tmpForInRhs = $(tmpArg);
for (a in tmpForInRhs) {
  $(a);
}
`````
