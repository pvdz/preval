# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of b) $(a.x);
`````

## Normalized

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of b) {
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
    const tmpCallCallee = $;
    const tmpCalleeParam = a.x;
    tmpCallCallee(tmpCalleeParam);
  }
}
`````

## Output

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of b) {
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
    const tmpCalleeParam = a.x;
    $(tmpCalleeParam);
  }
}
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
