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
let a;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
for (a of tmpForOfRhs) {
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
