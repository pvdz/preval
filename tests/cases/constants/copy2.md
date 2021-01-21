# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
const wow = bar;
$(wow)
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = foo;
const wow = bar;
$(wow);
`````

## Output

`````js filename=intro
$('five');
`````

## Result

Should call `$` with:
 - 0: "five"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
