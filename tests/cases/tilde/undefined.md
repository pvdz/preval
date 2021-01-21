# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~undefined;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: -1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
