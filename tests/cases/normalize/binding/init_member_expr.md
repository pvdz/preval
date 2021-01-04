# Preval test case

# init_member_expr.md

> normalize > binding > init_member_expr
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'foo'.length;
$(x);
`````

## Output

`````js filename=intro
let x = 'foo'.length;
$(x);
`````