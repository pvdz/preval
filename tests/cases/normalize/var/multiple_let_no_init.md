# Preval test case

# multiple_let_no_init.md

> normalize > var > multiple_let_no_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
let a, b, c

$(a);
$(b);
$(c);
`````

## Normalized

`````js filename=intro
let a;
let b;
let c;
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
