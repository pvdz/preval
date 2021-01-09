# Preval test case

# call_arg_order.md

> normalize > sequence > call_arg_order
>
> In a call we can only trivially outline sequence expressions of the first arg. We can do the other ones but that requires temporary assignment of all non-ident/non-literals to ensure no side effects.

#TODO

## Input

`````js filename=intro
// Second
$($(1), ($(2), $(3)));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = $(1);
$(2);
tmpArg_1 = $(3);
$(tmpArg, tmpArg_1);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x(8);
x(8);
x = x(8);
x(x, x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = $(1);
$(2);
tmpArg_1 = $(3);
$(tmpArg, tmpArg_1);
`````
