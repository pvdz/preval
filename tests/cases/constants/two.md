# Preval test case

# two.md

> constants > two
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar)
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = 'six';
$(bar);
`````

## Output

`````js filename=intro
$('six');
`````

## Result

Should call `$` with:
[['six'], null];

Normalized calls: Same

Final output calls: Same
