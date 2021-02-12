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
const tmpCallCallee = $;
$(1);
const tmpCalleeParam = $(2);
const tmpCalleeParam$1 = $(3);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(2);
const tmpCalleeParam$1 = $(3);
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
