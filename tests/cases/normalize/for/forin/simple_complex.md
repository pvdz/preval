# Preval test case

# simple_complex.md

> Normalize > For > Forin > Simple complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
for (a in $({x: 1, y: 2})) $(a);
`````

## Pre Normal

`````js filename=intro
let a;
for (a in $({ x: 1, y: 2 })) $(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
for (a in tmpForInRhs) {
  $(a);
}
`````

## Output

`````js filename=intro
let a = undefined;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForInRhs = $(tmpCalleeParam);
for (a in tmpForInRhs) {
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - 2: 'x'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
