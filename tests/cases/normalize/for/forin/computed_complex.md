# Preval test case

# computed_complex.md

> Normalize > For > Forin > Computed complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a)[$('foo')] in $(b)) $(a);
`````

## Pre Normal

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
for ($(a)[$('foo')] in $(b)) $(a);
`````

## Normalized

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForInRhs = $(b);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForInLhsNode;
  $(a);
}
`````

## Output

`````js filename=intro
const a = {};
const b = { x: 1, y: 2 };
const tmpForInRhs = $(b);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpAssignComMemLhsObj = $(a);
  const tmpAssignComMemLhsProp = $('foo');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpForInLhsNode;
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - 2: {}
 - 3: 'foo'
 - 4: { foo: '"x"' }
 - 5: { foo: '"x"' }
 - 6: 'foo'
 - 7: { foo: '"y"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
