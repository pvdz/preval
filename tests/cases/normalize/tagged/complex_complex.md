# Preval test case

# complex_complex.md

> Normalize > Tagged > Complex complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(10) } ${ $(20) } def`;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['abc ', ' ', ' def'];
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$2 = $(20);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['abc ', ' ', ' def'];
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$2 = $(20);
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['abc ', ' ', ' def'], 10, 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
