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
for ($(a).x in $(b)) $(a.x);
`````

## Normalized

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForInRhs = $(b);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
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
const tmpForInRhs = $(b);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
    const tmpCalleeParam = a.x;
    $(tmpCalleeParam);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - 2: {}
 - 3: 'x'
 - 4: { x: '"x"' }
 - 5: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
