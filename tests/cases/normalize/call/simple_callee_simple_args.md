# Preval test case

# simple_callee_simple_args.md

> Normalize > Call > Simple callee simple args
>
> Calls should have simple idents

#TODO

## Input

`````js filename=intro
$(1, 2);
`````

## Normalized

`````js filename=intro
$(1, 2);
`````

## Output

`````js filename=intro
$(1, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
