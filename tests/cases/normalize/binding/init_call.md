# Preval test case

# init_call.md

> normalize > binding > init_call
>
> Binding declaration with a simple call should not be outlined

#TODO

## Input

`````js filename=intro
let x = $();
$(x);
`````

## Normalized

`````js filename=intro
let x = $();
$(x);
`````

## Output

`````js filename=intro
let x = $();
$(x);
`````