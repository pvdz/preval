# Preval test case

# init_simple.md

> normalize > binding > init_simple
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = Infinity;
$(x);
`````

## Normalized

`````js filename=intro
let x = Infinity;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
