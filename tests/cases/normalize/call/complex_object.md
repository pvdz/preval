# Preval test case

# complex_object.md

> normalize > call > complex_object
>
> Calls should have simple objects

#TODO

## Input

`````js filename=intro
const a = {b: $};
$(a).b(1);
`````

## Normalized

`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
tmpCallObj.b(1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
