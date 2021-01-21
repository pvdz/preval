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

## Result

Should call `$` with:
 - 0: {"x":1,"y":2}
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same