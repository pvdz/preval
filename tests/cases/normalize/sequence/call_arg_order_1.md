# Preval test case

# call_arg_order.md

> normalize > sequence > call_arg_order
>
> In a call we can only trivially outline sequence expressions of the first arg. We can do the other ones but that requires temporary assignment of all non-ident/non-literals to ensure no side effects.

#TODO

## Input

`````js filename=intro
// First
$(($(1), $(2)), $(3));
`````

## Normalized

`````js filename=intro
$(($(1), $(2)), $(3));
`````

## Output

`````js filename=intro
$(($(1), $(2)), $(3));
`````
