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

## Globals

None

## Result

Should call `$` with:
 - 1: 'six'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
