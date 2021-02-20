# Preval test case

# one.md

> Typeof > One
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof 1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'number';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('number');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
