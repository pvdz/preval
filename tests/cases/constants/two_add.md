# Preval test case

# two.md

> constants > two
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar + foo)
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = 'six';
const tmpCallCallee = $;
const tmpCalleeParam = bar + foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = 'six' + 'five';
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'sixfive'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
