# Preval test case

# end.md

> normalize > sequence > end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
(($(1), $(2)), $(3), $(4), $(5), $(6));
`````

## Normalized

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: undefined

Normalized calls: Same

Final output calls: Same
