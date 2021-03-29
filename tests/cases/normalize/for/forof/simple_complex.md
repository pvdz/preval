# Preval test case

# simple_complex.md

> Normalize > For > Forof > Simple complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
for (a of $({x: 1, y: 2})) $(a);
`````

## Pre Normal

`````js filename=intro
let a;
for (a of $({ x: 1, y: 2 })) $(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
for (a of tmpForOfRhs) {
  $(a);
}
`````

## Output

`````js filename=intro
let a = undefined;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForOfRhs = $(tmpCalleeParam);
for (a of tmpForOfRhs) {
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
