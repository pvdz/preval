# Preval test case

# complex_arg.md

> normalize > delete > complex_arg
>
> The complex arg should not lead to a syntax error

#TODO

## Input

`````js filename=intro
const x = {y: 1};
$(x);
delete $(x);
$(x);
`````

## Normalized

`````js filename=intro
const x = { y: 1 };
$(x);
$(x);
true;
$(x);
`````

## Output

`````js filename=intro
const x = { y: 1 };
$(x);
$(x);
$(x);
`````

## Result

Should call `$` with:
 - 0: {"y":1}
 - 1: {"y":1}
 - 2: {"y":1}
 - 3: undefined

Normalized calls: Same

Final output calls: Same
