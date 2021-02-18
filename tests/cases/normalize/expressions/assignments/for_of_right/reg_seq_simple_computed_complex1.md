# Preval test case

# auto_seq_simple_computed_complex.md

> normalize > expressions > assignments > for_of_right > auto_seq_simple_computed_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
for (let x of $([]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [];
const tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
let x;
for (x of tmpForOfDeclRhs) {
}
`````

## Output

`````js filename=intro
const tmpCalleeParam = [];
const tmpForOfDeclRhs = $(tmpCalleeParam);
let x;
for (x of tmpForOfDeclRhs) {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
