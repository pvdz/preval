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

## Output

`````js filename=intro
$('object');
`````
