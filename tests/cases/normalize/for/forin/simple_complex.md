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
let a;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1, y: 2 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
for (a in tmpForInRhs) {
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
 - 2: 'x'
 - 3: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
