# Preval test case

# multiple_var_no_init.md

> normalize > var > multiple_var_no_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
var a, b, c

$(a);
$(b);
$(c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
$(a);
$(b);
$(c);
`````

## Output

`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````