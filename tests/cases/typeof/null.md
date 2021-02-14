# Preval test case

# min_null.md

> plusmin > min_null
>
> Inlining `typeof` when we know something is a literal

The joke of JS.

I believe the idea was to have `null` represent "the empty object" or placeholder or whatever. But at this point in time it's just bs and something that'll never be fixed.

## Input

`````js filename=intro
$(typeof null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'object';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('object');
`````

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
